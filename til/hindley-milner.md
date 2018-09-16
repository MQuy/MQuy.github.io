## Hindley Milner

In order to explain hindley milner, we need to understand ground terms below:
  - Mono types: are the inner building blocks of all types.
  ```haskell
  data MType =
    TVar String
    | TConst String
    | TFun MType MType
    | TList MType
    | TTuple MType MType
  ```
  - Polly types: are monotype universally quanlified over a number of type variables.
  ```haskell
  data PType = Forall (Set Name) MType
  ```
  - Environment: consists of all the values available in scope and their asscicated polytypes.
  ```haskell
  newtype Env = Env (Map Name PType)
  
  >>> Env [ ("id", Forall ["a"] (TFun (TVar "a") (TVar "a")))
          , ("const", Forall ["a", "b"] (TFun (TVar "a") (TFun (TVar "b") (TVar "a"))))
          , ("name", Forall [] (TVar "a"),
          , ("isDone", Forall [] (TConst "Bool") ]
  ```
  - Substitution: is mapping from type variables to MType
  ```haskell
  newtype Subst = Subst (Map Name MType)
  
  >>> Subst [ ("a", TFun (TVar "b") (TVar "b"))
            , ("b", TBool True) ]
  ```

There are two main hm's processes: inference and unification.

### Inference

Based on lambda calculus, we will have for four kinds of inference: `inferVar`, `inferLambda`, `inferApp`, `inferLet`.

#### `inferVar`
```haskell
inferVar env name do
  sigma <- lookupEnv env name
  tau = instantiate sigma
  
  return (mempty, tau)
```

**instantiate** binds all quantified variables of PType to fresh type variable (fresh means that you create a new name which doesn't exist in our environment).

```haskell
>>> sigma = Forall ["a"] (TFun (TVar "b") (TVar "a"))
>>> sigma1 = Forall [] (Tvar "a")
>>> instantiate sigma -- TFun (TVar "b") (TVar "c") -- a is replaced with the new type variable c
>>> instantiate sigma1 -- TVar "a"
```

#### `inferLet`
```haskell
inferLet env x e1 e2 do
  (s1, tau1) <- infer env e1
  env1 = applySubst s1 env
  sigma = generalize env1 tau1
  env2 = extendEnv env1 (x, sigma)
  (s2, tau2) <- infer env2 e2
  return (s1 <> s2, tau2)
```

**generalize** converts MType into PType
```haskell
>>> tau = tau = TFun (TVar "a") (TVar "b")
>>> generalize tau -- Forall ["a"] (TFun (TVar "a") (TVar "b"))
```

#### `inferLambda`
```haskell
inferLambda env x e = do
  tau <- fresh
  sigma = Forall [] tau
  env1 = extendEnv env (x, sigma)
  (s, tau1) <- infer env1 e
  return (s, TFun (applySubst s tau) tau1)
```

#### `inferApp`
```haskell
inferApp env e1 e2 do
  (s1, tau1) <- infer env e1
  (s2, tau2) <- infer (applySubst s1 env) e2
  tau3 <- fresh
  s3 <- unify (applySubst s2 tau1, TFun tau1 tau3)
  return (s1 <> s2 <> s3, tau2)
```

### Unification

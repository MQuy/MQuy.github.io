### Unicode
https://www.bignerdranch.com/blog/unicode-and-utf-8-explained/

### Terms
+ Character is an overloaded term than can mean many things.

+ A code point is the atomic unit of information. Text is a sequence of code points. Each code point is a number which is given meaning by the Unicode standard.

+ A code unit is the unit of storage of a part of an encoded code point. In UTF-8 this means 8-bits, in UTF-16 this means 16-bits. A single code unit may represent a full code point, or part of a code point. For example, the snowman glyph (☃) is a single code point but 3 UTF-8 code units, and 1 UTF-16 code unit.

+ A grapheme is a sequence of one or more code points that are displayed as a single, graphical unit that a reader recognizes as a single element of the writing system. For example, both a and ä are graphemes, but they may consist of multiple code points (e.g. ä may be two code points, one for the base character a followed by one for the diaresis; but there's also an alternative, legacy, single code point representing this grapheme). Some code points are never part of any grapheme (e.g. the zero-width non-joiner, or directional overrides).

[Source](https://stackoverflow.com/questions/27331819/whats-the-difference-between-a-character-a-code-point-a-glyph-and-a-grapheme#27331885)

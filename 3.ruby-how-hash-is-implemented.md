### How Ruby Hash Is Implemented

Ruby's hash are implemented with a data structure known as a _**hash table**_. Objects used as keys in a hash must have a method named _hash_ that returns a _**hashcode**_ for the key (if two keys are equal, they must have a same hashcode.)

Ruby uses the [murmur hash function](https://en.wikipedia.org/wiki/MurmurHash) and then applies the division method with a prime number M (also knowned as Bin).

> In ruby 2.3.0, _**hash table bin**_ is actually stored in a linked list.

> In ruby 2.4.0, _**hash table bin**_ just stores for key which references the index of entry in the _**entries array**_

One on the problem faced by hash functions is distribution. What if most remainders fall into the same bucket? To solve that problem, Ruby adjusts the value M based on _density_ (the number of records in bin). When the density is reached, Ruby will adjusts the value of M, recomputes and adjusts the hash for all the records.

#### Example
```ruby
class TurboHash
  STARTING_BINS = 16

  attr_accessor :table

  def initialize
    @max_density = 5
    @entry_count = 0
    @bin_count   = STARTING_BINS
    @table       = Array.new(@bin_count) { [] }
  end

  def grow
    # use bit shifting to get the next power of two and reset the table size
    @bin_count = @bin_count << 1

    # create a new table with a much larger number of bins
    new_table = Array.new(@bin_count) { [] }

    # copy each of the existing entries into the new table at their new location,
    # as returned by index_of(key)
    @table.flatten(1).each do |entry|
      new_table[index_of(entry.first)] << entry
    end

    # Finally we overwrite the existing table with our new, larger table
    @table = new_table
  end

  def full?
    # our bins are full when the number of entries surpasses 5 times the number of bins
    @entry_count > @max_density * @bin_count
  end

  def [](key)
    find(key).last
  end

  def find(key)
    bin_for(key).find do |entry|
      key == entry.first
    end
  end

  def bin_for(key)
    @table[index_of(key)]
  end

  def index_of(key)
    # use @bin_count because it now changes each time we resize the table
    key.hash % @bin_count
  end

  def []=(key, value)
    entry = find(key)

    if entry
      entry[1] = value
    else
      # grow the table whenever we run out of space
      grow if full?

      bin_for(key) << [key, value]
      @entry_count += 1
    end
  end
end
```

[More details](https://blog.heroku.com/ruby-2-4-features-hashes-integers-rounding#what-39-s-this-other-default-max-density-number)

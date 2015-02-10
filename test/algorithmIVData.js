/* Algorithm IV (v1.0.0) (learn@algorithmiv.com)
 * Section: User Data, App Initialization, & Web Worker
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The MIT License (algorithmiv.com/docs/license) */

/**
 * ------------------------------------------------------------------
 * Algorithm IV User Data (v1.0.0)
 * ------------------------------------------------------------------
 * manages a list of practice questions and detailed solutions
    for learning computer science focused algorithms and data
    structures, improving programming skillsets, and preparing
    for technical interviews
 * settings: configuration, categories, sources, and questions
 * directions:
   - see algorithmiv.com/docs/start
 */
(function() {
  "use strict";

  /**
   * -----------------------------------------------
   * Public Variable (configuration)
   * -----------------------------------------------
   * an object containing the configuration settings
      for this module
   * details:
     - see algorithmiv.com/docs/configuration
   */
  var configuration = {
    searchSettings: {
         stage: true,
        source: true,
      category: true,
        subCat: true
    },
    searchDefaults: {
         view: 'one',
        order: 'asc',
        stage: 'all',
       source: 'all',
      mainCat: 'all',
       subCat: 'all',
      startID:  0
    },
    questionFormat: {
            id: true,
      complete: true,
        source: true,
      category: true,
         links: true,
        output: true
    },
    prettyCode: {
      lineHeight: 26
    },
        id: true,
    worker: true
  };

  /**
   * -----------------------------------------------
   * Public Variable (sources)
   * -----------------------------------------------
   * an object containing all of the sources that
      created each of the problems included on this
      page
   * every source id must be unique
   * if object is empty the source functionality is
      disabled
   * object format:
      var sources = {
        'sourceID': 'Source Name'
      }
   */
  var sources = {
    'am': 'Amazon',
    'bl': 'Bloomberg',
    'fb': 'Facebook',
    'go': 'Google'
  };

  /**
   * -----------------------------------------------
   * Public Variable (categories)
   * -----------------------------------------------
   * an object containing each main and sub question
     category
   * every category id must be unique (a sub category
      id cannot be the same as any main category id)
   * if the main property is empty the category
      functionality is fully disabled
   * if the sub property is empty only the sub category
      functionality is disabled
   * object format:
      var categories = {
        main: {
          'mainCategoryID': 'Category Name'
        },
        sub: {
          'mainCategoryID': {
            'subCategoryID': 'Category Name'
          } 
        }
      }
   */
  var categories = {
    main: {
      'graph' : 'Graphs',
      'hash'  : 'Hash Tables',
      'heap'  : 'Heaps',
      'search': 'Searching Algorithms',
      'sort'  : 'Sorting Algorithms',
      'tree'  : 'Trees'
    },
    sub: {
      'graph': {
        'digraph': 'Directed Graphs'
      },
      'hash': {
        'dblHash': 'Double Hashing'
      },
      'search': {
        'back' : 'Backtracking',
        'bfs'  : 'Breadth First Search',
        'brute': 'Brute Force Search',
        'dfs'  : 'Depth First Search'
      },
      'tree': {
        'binTree': 'Binary Trees',
        'trie'   : 'Tries'
      }
    }
  };

  /**
   * ---------------------------------------------
   * Public Variable (questions)
   * ---------------------------------------------
   * an array of objects containing each question,
      its details, and your solution for it
   * all below properties are required for every
      object
   * object format:
    {
      complete: false,
        source: 'sourceID',
       mainCat: [ 'mainCatID' ],
        subCat: [ 'subCatID','subCatID' ],
         links: [
                  {
                    name: 'Algorithm IV Website',
                    href: 'http://www.algorithmiv.com'
                  }
                ],
       problem: 'Can You Learn More',
      solution: function() {
        return 'No Problem';
      }
    }
   * object properties:
     - complete:
       -- description:
          ~ indicates whether solution is finished
       -- value type: boolean
       -- options:
          ~ true: question is finished
          ~ false: question is incomplete
     - source:
       -- description:
          ~ the id for the question's source
       -- value type: string
     - mainCat:
       -- description:
          ~ the ids for every matching main category
       -- value type: array of strings
     - subCat:
       -- description:
          ~ the ids for every matching sub category
       -- value type: array of strings
     - links:
       -- description:
          ~ links to more details on question
       -- value type: array of objects
       -- object properties:
          ~ name:
            ~~ the displayed name of the link
            ~~ value type: string
          ~ href:
            ~~ the http address for the link
            ~~ value type: string
     - problem:
       -- description:
          ~ the practice problem
          ~ accepts html markup
          ~ use html entities to show reserved html
       -- value type: string
     - solution:
       -- description:
          ~ the code for the solution of the problem
          ~ must be wrapped in an anonymous function
       -- value type: function
   */
  var questions = [
    {
      // Question: 1
      complete: true,
        source: 'fb',
       mainCat: [ 'search', 'tree' ],
        subCat: [ 'bfs', 'binTree' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=4505011482525696'
           }
         ],
       problem: 'Write a function that prints the rows of a binary tree, terminating each row with a carriage return.',
      solution: function() {
        /*
         ** Solution:
         *  - A basic Breadth First Search algorithm is used
         *  to traverse the data structure for this solution.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Breadth First Search (BFS): http://en.wikipedia.org/wiki/Breadth-first_search
         *  - Data Structures:
         *    -- Binary Tree: http://en.wikipedia.org/wiki/Binary_tree
         */

        // Set test data
        var graph = [
          { node:  0, links: [ 1, 2] },
          { node:  1, links: [ 3, 4] },
          { node:  2, links: [ 5, 6] },
          { node:  3, links: [ 7, 8] },
          { node:  4, links: [ 9,10] },
          { node:  5, links: [11,12] },
          { node:  6, links: [13,14] },
          { node:  7, links: [] },
          { node:  8, links: [] },
          { node:  9, links: [] },
          { node: 10, links: [] },
          { node: 11, links: [] },
          { node: 12, links: [] },
          { node: 13, links: [] },
          { node: 14, links: [] }
        ];

        // The BFS function
        function printNodes() {
          // The list of current nodes to be searched
          // The current node being searched
          // The max number of nodes for the current row
          // The current number of nodes on the current row
          // The final string of nodes by row
          // The number of children the current node contains
          // The current child
          var list, node, rowMax, rowCount, result, childCount, child;

          // Set list to array with node 0
          list = [0];
          // Set max of first row to 1
          rowMax = 1;
          // Set current row count to 0
          rowCount = 0;
          // Set result to empty string
          result = '';

          // Loop through nodes
          while (list.length > 0) {

            // Set current node to first 
            node = list[0];
            // Remove current node from list
            list.splice(0, 1);
            // Increase the count by one
            ++rowCount;
            // Set result
            result += node + ( (rowMax === rowCount) ? '<br />' : ',' );

            // If (level finished)
            // Then {double it}
            if (rowMax === rowCount) {
              rowMax = rowMax * 2;
              rowCount = 0;
            }

            // Save current node's child count
            childCount = graph[node].links.length;

            // Add current node's children to list
            for (child=0; child<childCount; child++) {
              list.push(graph[node].links[child]);
            }
          }

          // Return the resulting BST
          return result;
        }
        
        // Run and return the BST function
        return printNodes();
      }
    },
    {
      // Question: 2
      complete: true,
        source: 'am',
       mainCat: [ 'search', 'graph' ],
        subCat: [ 'back', 'dfs', 'digraph' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=6031402409656320'
           }
         ],
       problem: 'Imagine a large city like Los Angeles. Suppose someone shows up at location A, then N minutes later at location B. Design a function that approximates the probability they passed a Starbucks.',
      solution: function() {
        /*
         ** Solution:
         *  - A recursive backtracking algorithm is used to
         *  traverse a time weighted digraph of locations.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Backtracking: http://en.wikipedia.org/wiki/Backtracking
         *    -- Depth First Search (DFS): http://en.wikipedia.org/wiki/Depth-first_search
         *  - Data Structures:
         *    -- Directed Graph (Digraph): http://en.wikipedia.org/wiki/Directed_graph
         *    -- Weighted Graph: http://en.wikipedia.org/wiki/Glossary_of_graph_theory#Weighted_graphs_and_networks
         */

        // A list of vertices, edges, weights, and Starbucks
        // The starting node (location a)
        // The final node (location b)
        // The maximum weight of a path (max minutes of time)
        // The current path being checked
        // A string containg all the paths
        var graph, start, end, maxWeight, path, returnPaths;
        // The count of all the possible paths
        // The count of all the possible paths with a Starbucks
        // The probability of passing a Starbucks
        var allPaths, starPaths, prob;

        // Set the test data
        graph = [
          {
            node: 0,
            links: [
              { node: 1, weight: 5, starbucks: false },
              { node: 2, weight: 5, starbucks: false },
              { node: 3, weight: 5, starbucks: false }
            ]  
          },
          {
            node: 1,
            links: [
              { node: 3, weight: 5, starbucks: false },
              { node: 4, weight: 5, starbucks: false }
            ]
          },
          {
            node: 2,
            links: [
              { node: 4, weight: 5, starbucks: false },
              { node: 5, weight: 5, starbucks:  true }
            ]
          },
          {
            node: 3,
            links: [
              { node: 6, weight: 5, starbucks: false }
            ]
          },
          {
            node: 4,
            links: [
              { node: 6, weight: 5, starbucks: false }
            ]
          },
          {
            node: 5,
            links: [
              { node: 7, weight: 5, starbucks: false },
              { node: 8, weight: 5, starbucks: false },
              { node: 9, weight: 5, starbucks: false }
            ]
          },
          {
            node: 6,
            links: [
              { node: 7, weight: 5, starbucks: false },
              { node: 9, weight: 5, starbucks: false }
            ]
          },
          {
            node: 7,
            links: [
              { node: 8, weight: 5, starbucks: false }
            ]
          },
          {
            node: 8,
            links: [
              { node: 9, weight: 5, starbucks: false }
            ]
          }
        ];
        start = 0;
        end = 9;
        maxWeight = 20;
        path = [];
        returnPaths = '';
        allPaths = 0;
        starPaths = 0;

        // The backtracking algorithm
        // param: The current node
        // param: The current cumulative weight
        // param: Whether a starbucks currently exists
        function findPaths(node, weight, starbucks) {
          // The number of children the current node contains
          // An index for traversing all the current node's children
          // The object containing all of the current child's info
          // The new total path weight after child's weight has been added
          // The new starbucks value
          var childCount, c, child, newWeight, newStar;

          // If (weight is greater than max weight)
          // Then {end this path traversal}
          if (weight > maxWeight) {
            return;
          }

          // If (node is destination)
          if (node === end) {
            // Add path to return string
            returnPaths += '{ ' +
              'path: [' + path + ',' + end + '],' +
              'starbucks: ' + ( (starbucks) ? ' true' : 'false' ) +
            ' }<br />';
            // Add path to total counts
            ++allPaths;
            starPaths += (starbucks) ? 1 : 0;
            // End path traversal
            return;
          }

          // Add node to current path
          path.push(node);
          // Save the number of children
          //  for the current node
          childCount = graph[node].links.length;

          // Find each child's path
          for (c=0; c<childCount; c++) {
            // Set child object
            child = graph[node].links[c];
            // Set new weight total
            newWeight = weight + child.weight;
            // Set new value for starbucks
            newStar = ( (starbucks || child.starbucks) ?
              true : false
            );
            // Call algorithm
            findPaths(child.node, newWeight, newStar);
          }

          // Remove current node from path
          path.pop();
        }

        // Calculate the number of paths
        findPaths(start, 0, false);
        
        // Calculate probability of passing a Starbucks
        prob = (starPaths / allPaths) * 100;
        prob = Math.ceil(prob);

        // Return details
        return 'All Paths: ' + allPaths + '<br />' +
               'Paths with Starbucks: ' + starPaths + '<br />' +
               'Probability of passing Starbucks: ' + prob + '%<br />' +
               'List of All Paths:<br />' + returnPaths;
      }
    },
    {
      // Question: 3
      complete: true,
        source: 'go',
       mainCat: [ 'hash' ],
        subCat: [ 'dblHash' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=5724911848914944'
           }
         ],
       problem: 'Given a table of [Url =&gt; Content] pairs produce a new table of [Url =&gt; Duplicate Urls] pairs.<br /><br />' +
                'Example Input:<br />' +
                'a.com =&gt; &lt;html&gt;a&lt;/html&gt;<br />' +
                'b.com =&gt; &lt;html&gt;b&lt;/html&gt;<br />' +
                'c.com =&gt; &lt;html&gt;c&lt;/html&gt;<br />' +
                'd.com =&gt; &lt;html&gt;a&lt;/html&gt;<br />' +
                'e.com =&gt; &lt;html&gt;a&lt;/html&gt;<br /><br />' +
                'Example Output:<br />' +
                'a.com =&gt; [d.com, e.com]<br />' +
                'b.com =&gt; []<br />' +
                'c.com =&gt; []',
      solution: function() {
        /*
         ** Solution:
         *  - A modified FNV-1a hash algorithm is used to create a
         *  hash table for each url's content. Then the hashes of
         *  each url are compared to identify duplicates.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- FNV Hash Algorithm: http://www.isthe.com/chongo/tech/comp/fnv/
         *    -- Double Hashing: http://en.wikipedia.org/wiki/Double_hashing
         *  - Data Structures:
         *    -- Hash Table: http://en.wikipedia.org/wiki/Hash_table
         */
        
        // Supplied urls and their content
        var inputs;

        // Setup variables
        inputs = {
          'a.com': '<html>a</html>',
          'b.com': '<html>b</html>',
          'c.com': '<html>c</html>',
          'd.com': '<html>a</html>',
          'e.com': '<html>a</html>'
        };

        // FNV-1a hash algorithm
        // param: The string to be hashed
        // param: The extra times to hash
        function createHash(string, extras) {
          // The resulting hash
          // The string length
          // Loop index
          var hash, len, i;

          // Set extras
          extras = extras || 0;
          // Set hash to 32 bit FNV offset_basis
          hash = 2166136261;
          // Save string length
          len = string.length;

          // Loop through each string character
          for (i=0; i<len; i++) {
            // XOR first
            hash = hash ^ string.charAt(i);
            // Multiply by 32 bit FNV_prime
            hash = hash * 16777619;
          }
          
          if (extras > 0) {
            // Loop through each extra time
            for (i=0; i<extras; i++) {
              // XOR first
              hash = hash ^ string.charAt(i);
              // Multiply by 32 bit FNV_prime
              hash = hash * 16777619;
            }
          }

          // Return completed hash
          return hash;
        }

        // Create a hash table for the url content
        function createHashTable() {
          // Function that adds hash to table
          // The hash table
          // The current url
          // The current url's content
          // The current content's hash
          // Indicator to check if collision has occurred
          var addHash, hashes, url, content, hash, flag;

          // Set addHash function
          addHash = function(theUrl, theContent, theHash) {

            // If (hash does not exist in table)
            if (typeof hashes[theHash] === 'undefined') {
              // Add hash key to table
              hashes[theHash] = {
                collisions: 0,
                content: theContent
              };
              // Replace inputs content with hash
              inputs[theUrl] = theHash;
            }
            else {
              // If (no collision)
              // Then {replace inputs content with hash}
              // Else {add collision, create new hash, and repeat process}
              if (theContent === hashes[theHash].content) {
                inputs[theUrl] = theHash;
              }
              else {
                ++hashes[theHash].collisions;
                theHash = createHash(theContent, hashes[theHash].collisions);
                addHash(theUrl, theContent, theHash);
              }
            }
          }

          // Set hash table to empty object
          hashes = {};

          // Loop through supplied inputs
          for (url in inputs) {
            // Filter out default javascript properties
            if ( inputs.hasOwnProperty(url) ) {
              // Save the content
              content = inputs[url];
              // Hash url content
              hash = createHash(content);
              // Add to hash table
              addHash(url, content, hash);
            }
          }

          // Return the hash table
          return hashes;
        }

        // Create list of urls
        function createUrlList() {
          // The list of urls
          // The current url
          var urls, url;

          // Set url list to empty array
          urls = [];

          // Loop through supplied inputs
          for (url in inputs) {
            // Filter out default javascript properties
            if ( inputs.hasOwnProperty(url) ) {
              // Add url to list
              urls.push(url);
            }
          }

          // Return the list of urls
          return urls;
        }

        // Create duplicated url content
        function findDuplicates() {
          // A hash table of the url content
          // A list of the urls to check
          // The current url
          // The current hash
          // The current length of the url list
          // Loop index
          // The next url
          // Loop count
          // The resulting duplicates
          var hashes, urls, url, hash, len, i, next, c, duplicates;

          // Set hashes, urls, and duplicates
          hashes = createHashTable();
          urls = createUrlList();
          duplicates = {};

          // Loop through url list
          while (urls.length > 0) {

            // Save and remove first url on list
            url = urls.shift();
            // Save hash of current url's content
            hash = createHash(inputs[url]);
            // Add url to list of duplicates
            duplicates[url] = [];
            // Save the current url list length
            len = urls.length;
            // Set index and count to 0
            i = c = 0;

            // Loop through url list
            loop:
            while (true) {

              // If (count is equal to length)
              // Then {end loop}
              if (c === len) {
                break loop;
              }
              // Save next url
              next = urls[i];
              
              // If (urls content matches)
              // Then {save to duplicates and remove from url list}
              // Else {increase index}
              if (inputs[url] === inputs[next]) {
                duplicates[url].push(next);
                urls.splice(i, 1);
              }
              else {
                ++i;
              }

              // Add one to count
              ++c;
            }
          }
          
          // Return the duplicates
          return duplicates;
        }

        // Prepare results to be returned
        function prepareResults() {
          // The duplicates
          // The results
          // The current url
          var duplicates, results, url;

          // Set duplicates and results
          duplicates = findDuplicates();
          results = '';

          // Loop through results
          for (url in duplicates) {
            // Filter out default javascript properties
            if ( duplicates.hasOwnProperty(url) ) {
              // Add url to results
              results += url + ' => [' + duplicates[url].join(',') + ']<br />';
            }
          }

          // Return results
          return results;
        }

      return prepareResults();
      }
    },
    {
      // Question: 4
      complete: true,
        source: 'go',
       mainCat: [ 'search', 'tree', 'graph' ],
        subCat: [ 'brute', 'back', 'dfs', 'trie', 'digraph' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=6270813198090240'
           }
         ],
       problem: 'You are given a string of four lower case characters and a dictionary of english words. Choose a data structure to represent the dictionary and write an algorithm that returns all the words from the dictionary that can be formed by the characters of the string.<br />' +
                'Example:<br />' +
                'string = \'ogeg\'<br />' +
                'words = [ \'go\',\'egg\',\'ego\', ... ]',
      solution: function() {
        /*
         ** Solution:
         *  - A brute force algorithm is used to create a trie
         *  from the supplied list of words. Then a digraph is
         *  constructed for all of the characters in the
         *  supplied string. Finally a backtracking algorithm
         *  is used to find the possible words resulting from
         *  the digraph of the supplied string.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Brute Force: http://en.wikipedia.org/wiki/Brute-force_search
         *    -- Backtracking: http://en.wikipedia.org/wiki/Backtracking
         *    -- Depth First Search (DFS): http://en.wikipedia.org/wiki/Depth-first_search
         *  - Data Structures:
         *    -- Trie: http://www.geeksforgeeks.org/trie-insert-and-search/
         *    -- Double-Array Trie: http://linux.thai.net/~thep/datrie/
         *    -- Directed Graph (Digraph): http://en.wikipedia.org/wiki/Directed_graph
         *
         ** Copyright Notice:
         *  - The list of English words used to create the test data
         *  for this question was derived from the EOWL and UKACD.
         *  - See github.com/imaginate/algorithmIV/blob/master/example/resources/words.json
         *  - See http://dreamsteep.com/projects/the-english-open-word-list.html
         *  - Copyright (c) J Ross Beresford 1993-1999. All Rights Reserved.
         *  - Copyright Details: http://cfajohnson.com/wordfinder/UKACD17.shtml 
         */

        // A list of English words for this test
        // A trie of words with a max length of 4
        //   characters and starting with each of
        //   the string's characters
        // The input string
        // The resulting possible words from the string
        var words, wordTrie, string, results;

        // Setup variables
        words    = {};
        wordTrie = {};
        string   = 'dane';
        results  = [];

        // Create the trie of words
        function createWordTrie() {
          // The supplied string
          // The current letter
          // The index of the last duplicate letter
          var theString, letter, lastDupl;

          // Save a copy of the string as an array
          theString = string.split('');
          theString.sort();

          // Loop through characters
          while (theString.length > 0) {

            // Save letter and remove letter from string
            letter = theString.shift();
            // Save index of last duplicate
            lastDupl = theString.lastIndexOf(letter);
            // If (letter duplicates exist in string)
            // Then {remove each one}
            if (lastDupl !== -1) {
              theString.splice(0, lastDupl);
            }
            // Add a branch to the trie
            addTrieBranch(letter);
          }
        }

        // Adds a branch to the root of trie
        // param: the letter branch to create
        function addTrieBranch(letter) {
          // The word loop index
          // The count of words
          // The current word
          // The current word length
          // An array of the word's characters
          // The character loop index
          var i, wordsLen, word, wordLen, characters, c;
          // The last character index
          // The current string of characters
          // The current character
          var last, current, character;
          
          // Add branch to trie
          wordTrie[letter] = {
            isWord: false,
              kids: []
          };
          // Save words length
          wordsLen = words[letter].length;

          // Loop through words
          for (i=0; i<wordsLen; i++) {
            
            // Save word and word length
            word = words[letter][i];
            wordLen = word.length;

            // If (word has less than 5 characters)
            // Then {add word to trie}
            if (wordLen < 5) {

              // If (word is one character)
              // Then {set root end prop to true}
              // Else {add word to trie}
              if (wordLen === 1) {
                wordTrie[letter].isWord = true;
              }
              else {

                // Save last index
                last = wordLen - 1;
                // Create array of characters
                characters = word.split('');
                // Save current string of characters
                current = letter;            

                // Loop through remaining characters
                for (c=1; c<=last; c++) {

                  // Save current character
                  character = characters[c];
                  // If (character not in parent's list of kids)
                  // Then {add character}
                  if (wordTrie[current].kids.indexOf(character) === -1) {
                    wordTrie[current].kids.push(character);
                  }
                  // Update current string
                  current += character;
                  // If (current string does not exist)
                  // Then {add to trie}
                  // Else {update isWord}
                  if (typeof wordTrie[current] === 'undefined') {
                    wordTrie[current] = {
                      isWord: (c === last),
                        kids: []
                    };
                  }
                  else {
                    wordTrie[current].isWord = ( (wordTrie[current].isWord) ?
                      true : (c === last)
                    );
                  }
                }
              }
            }
          }
        }

        // Create digraph of supplied string
        function createDigraph() {
          // The supplied string as an array
          // The digraph of the string
          // The first loop index
          // The current list
          // The second loop index
          // The remaining characters
          var theString, graph, i, list, x, remain;

          // Set the variables
          theString = string.split('');
          graph = {};

          // Loop through characters
          for (i=0; i<4; i++) {

            // Add character to graph
            graph[theString[i]] = {};
            // Save current list
            list = theString.slice(0);
            list.splice(i, 1);
            
            // Loop through remaining characters
            for (x=0; x<3; x++) {

              // Add character to children
              graph[theString[i]][list[x]] = {};
              // Save remaining characters
              remain = list.slice(0);
              remain.splice(x, 1);
              // Add remaining children to graph
              graph[theString[i]][list[x]][remain[0]] = remain[1];
              graph[theString[i]][list[x]][remain[1]] = remain[0];
            }
          }

          return graph;
        }

        // Finds all of the possible words resulting from the string
        function findWords() {
          // Digraph of string
          // A function to recursively handle the DFS
          var graph, backtrack;

          // Recursively backtrack to find words
          // param: The current node
          // param: The current word to be checked
          backtrack = function(node, word) {
            // The child node
            // The new word
            var child, newWord;

            // If (word is undefined)
            // Then {set to empty string}
            word = word || '';

            // Loop through string
            for (child in node) {
              // Filter out default javascript properties
              if ( node.hasOwnProperty(child) ) {

                // Add character to create new word
                newWord = word + child;

                // If (partial word exists)
                // Then {continue search}
                if (typeof wordTrie[newWord] === 'object') {

                  // If (partial word is complete)
                  // Then {add word to results}
                  if (wordTrie[newWord].isWord) {
                    results.push(newWord);
                  }

                  // If (child has children)
                  // Then {repeat backtrack}
                  // Else {modify and check word}
                  if (typeof node[child] === 'object') {
                    backtrack(node[child], newWord);
                  }
                  else {
                    // Verify error has not occurred
                    if (typeof node[child] === 'string') {

                      // Add child to word and check again
                      newWord += node[child];
                      if (typeof wordTrie[newWord] === 'object') {
                        if (wordTrie[newWord].isWord) {
                          results.push(newWord);
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // Set string digraph
          graph = createDigraph();
          // Start recursive search
          backtrack(graph);
        }

        // Download the json dictionary
        function makeAjaxCall() {
          // Contains the ajax call
          var http;

          http = new XMLHttpRequest();
          http.onreadystatechange = function() {
            // If (ajax finished)
            if (http.readyState === 4 && http.status === 200) {
              // Sanitize and set the words list
              words = JSON.parse(http.responseText);
            }
          };
          http.open('GET', 'resources/words.json', false);
          http.send();
        }

        // Trigger ajax
        makeAjaxCall();
        // Create the trie of words
        createWordTrie();
        // Find the possible words
        findWords();
        // Return results
        return '[ ' + results.join(',') + ' ]';
      }
    },
    {
      // Question: 5
      complete: true,
        source: 'bl',
       mainCat: [ 'search','graph' ],
        subCat: [ 'back','dfs','digraph' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=5768610725232640'
           }
         ],
       problem: 'Using the below node list find the path that uses all nodes without duplicating one.<br />' +
                '[ JFK,LXA,SNA,RKJ,LXA,SNA ]<br />' +
                'Note: Each pair of nodes define a directed edge like so:<br />' +
                '[ (JFK -&gt; LXA),(SNA -&gt; RKJ),(LXA -&gt; SNA) ]<br />',
      solution: function() {
        /*
         ** Solution:
         *  - First a digraph of the nodes and edges and an
         *  array of the two possible root nodes are created.
         *  Then a DFS algorithm is applied to find the path
         *  of the nodes.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Depth First Search (DFS): http://en.wikipedia.org/wiki/Depth-first_search
         *  - Data Structures:
         *    -- Directed Graph (Digraph): http://en.wikipedia.org/wiki/Directed_graph
         */

        // Original node list
        // Digraph of nodes
        // Possible root nodes
        // Final node path
        var nodes, graph, roots, nodeCount, result;

        // Set variables
        nodes = [ 'JFK','LXA','SNA','RKJ','LXA','SNA' ];
        graph = {};
        roots = [];
        result = '';

        // Add node to roots
        // param: node to add
        function addRoot(node) {
          // Index of node in roots array
          var i;

          // Save node index
          i = roots.indexOf(node);

          // If (node is not in roots)
          // Then {add to roots}
          // Else {remove from roots}
          if (i === -1) {
            roots.push(node);
          }
          else {
            roots.splice(i, 1);
          }
        }

        // Create digraph
        function createGraph() {
          // Count of node list
          // Loop index
          // The current node
          // The current edge
          var len, i, node, edge;

          // Save node list count
          len = nodes.length;

          // Loop through nodes
          for (i=0; i<len; i+=2) {

            // Save node and edge
            node = nodes[i];
            edge = nodes[i + 1];
            // Add nodes to roots
            addRoot(node);
            addRoot(edge);
            // Add node to digraph
            graph[node] = edge;
          }
        }

        // Find the root node
        function findRoot() {
          // Loop index
          var i;

          // Loop through roots
          for (i=0; i<2; ++i) {

            // If (node not in graph)
            // Then {remove it from roots}
            if (typeof graph[roots[i]] === 'undefined') {
              roots.splice(i, 1);
            }
          }
        }

        // Finds the correct path
        function findPath() {
          // The next node
          // The current node
          var next, node;

          // Set next to root node
          next = [roots[0]];

          // Run DFS
          while (next.length > 0) {

            // Save current node
            node = next.pop();
            // Add current node to final path
            result += node;
            // If (next node exists)
            // Then {add arrow to path and set next node}
            if (typeof graph[node] !== 'undefined') {
              result += ' -&gt; ';
              next.push(graph[node]);
            }
          }
        }

        createGraph();
        findRoot();
        findPath();
        return result;
      }
    },
    {
      // Question: 6
      complete: false,
        source: 'go',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=4863668900593664'
                  }
                ],
       problem: 'Given a binary search tree (BST), write a mehtod that will convert this BST into a doubly linked list that is sorted (ascending or descending order) and returns the first element in this list.<br />You may assume you are given following Node class:<br /><br />public&nbsp;&nbsp;class&nbsp;&nbsp;Node&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;Node&nbsp;&nbsp;left, right;<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;String&nbsp;&nbsp;val;<br />}<br /><br />Example:<br />&nbsp;&nbsp;G<br />&nbsp;/&nbsp;\\<br />A T<br />This BST can be converted into list, A = G = T<br /><br />Do it in place! The memory complexity of your algorithm shoul be O(1).',
      solution: function() {
        /*
         ** Solution:

         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    },
    {
      // Question: 7
      complete: false,
        source: 'fb',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=5748231105413120'
                  }
                ],
       problem: 'Given a Tree:<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br />&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C<br />&nbsp;&nbsp;/ \\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ \\<br />D&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;G<br /><br />Write a function that prints:<br />A<br />BC<br />DEFG',
      solution: function() {
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    },
    {
      // Question: 8
      complete: false,
        source: 'go',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=6295449935806464'
                  }
                ],
       problem: 'Represent the following in a data structure:<br />&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;span&gt;TEXT1&lt;/span&gt;&lt;br/&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;<br /><br />Do I do the same using a stack or create a tree for the same?',
      solution: function() {
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    },
    {
      // Question: 9
      complete: false,
        source: 'am',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=5082499984130048'
                  }
                ],
       problem: 'Design a data structure that can do the following operations in O(1) time:<br />Insert, Delete, Search, Max (returns the maximum number)<br /><br />I know delete, search and insert can be done O(1) time in a hashmap with a proper hash function, but not sure Max is even possible in O(1) with the presence of delete operation?',
      solution: function() {
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    },
    {
      // Question: 10
      complete: false,
        source: 'am',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=6260358392053760'
                  }
                ],
       problem: 'You are given two integer arrays A and B.<br /><br />1&lt;=i&lt;=len(A) so i is iterator of array A<br />1&lt;=j&lt;=len(B) so j is iterator of array B<br /><br />Find all the pairs (i,j) such that : i &lt; j and A[i]&gt;B[j].',
      solution: function() { 
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    }
  ];

/* ---------------------------- *
 * -- DO NOT EDIT BELOW HERE -- *
 * ---------------------------- */
//sedFlagMinifyInsert
//sedFlagWorkerStart

/**
 * ---------------------------------------------
 * Initialize Algorithm IV (v1.0.0)
 * ---------------------------------------------
 * triggers module init with user settings
 * @type {function(Object, Object, Object, Object)}
 * @private
 */
(function(configuration, categories, sources, questions) {
  // Verify objects have been set
  var newConfiguration = configuration || {}, 
      newCategories    = categories    || {},
      newSources       = sources       || {},
      newQuestions     = questions     || [];
  newConfiguration.searchSettings = configuration.searchSettings || {};
  newConfiguration.searchDefaults = configuration.searchDefaults || {};
  newConfiguration.questionFormat = configuration.questionFormat || {};
  newConfiguration.prettyCode     = configuration.prettyCode     || {};
  newConfiguration.prettyCode.prePadding = configuration.prettyCode.prePadding || {};
  newCategories.main = categories.main || {};
  newCategories.sub  = categories.sub  || {};
  // Trigger Algorithm IV
  if (typeof window !== 'undefined') {
    algorithmIV.init(newConfiguration, newCategories, newSources, newQuestions);
  }
}(configuration, categories, sources, questions));

/**
 * ------------------------------------------------------------------
 * Algorithm IV Web Worker (v1.0.0)
 * ------------------------------------------------------------------
 * handles converting your list of questions into a string of html
 * annotation:
   - Closure Compiler specific JSDoc: developers.google.com/closure/compiler/
 * structure:
   - see github.com/imaginate/algorithmIV/blob/master/workerStructure.md
   - contains an outline of all the variables, methods, and classes
      used in this web worker
 * contributing:
   - see github.com/imaginate/algorithmIV/blob/master/CONTRIBUTING.md
 */
(function(questions) {
  /**
   * -----------------------------------------------
   * Initialize Worker
   * -----------------------------------------------
   * initializes the web worker
   */
  onmessage = function(event) {
    // Declare method variables
    var args;
    // Save event.data reference
    args = event.data;
    // Set question length
    qLen = args.qLen;
    // Set configuration
    configuration = args.configuration;
    // Set sources
    sources = args.sources;
    // Set categories
    categories = args.categories;
    // Format the questions
    FormatQuestions.init();
    // Return formatted questions
    self.postMessage(configuration.content);
  };

  /**
   * ----------------------------------------------- 
   * Public Variable (qLen)
   * -----------------------------------------------
   * the length of the questions array
   * @type {number}
   * @private
   */
  var qLen;

  /**
   * -----------------------------------------------
   * Public Variable (configuration)
   * -----------------------------------------------
   * an object containing the display configuration
      settings for the module
   * @type {{
       searchSettings: {
            stage: boolean,
           source: boolean,
         category: boolean,
           subCat: boolean
       },
       searchDefaults: {
            view: string,
           order: string,
           stage: string,
          source: string,
         mainCat: string,
          subCat: string,
         startID: number
       },
       questionFormat: {
               id: boolean,
         complete: boolean,
           source: boolean,
         category: boolean,
            links: boolean,
           output: boolean
       },
       prettyCode: {
         prePadding: {
              top: number,
            right: number,
           bottom: number,
             left: number
         },
         lineHeight: number
       },
              id: boolean,
          worker: boolean,
         content: Array.<Object>,
       scrollbar: number
     }}
   * @private
   */
  var configuration = {};

  /**
   * -----------------------------------------------
   * Public Variable (sources)
   * -----------------------------------------------
   * an array of objects containing the question
      sources
   * @type {{
        list: Object,
         len: number,
         ids: Array.<string>
     }}
   * @private
   */
  var sources = {};

  /**
   * -----------------------------------------------
   * Public Variable (categories)
   * -----------------------------------------------
   * an array of objects containing the question
      categories
   * @type {{
       main: Object,
        sub: Object,
        opt: Object,
        len: {
          main: number,
           sub: Object
        },
        ids: {
          main: Array.<string>,
           sub: Array.<string>
        }
     }}
   * @private
   */
  var categories = {};

  /**
   * ---------------------------------------------
   * Public Class (FormatQuestions)
   * ---------------------------------------------
   * formats questions for live view
   * @type {function(): {
       init: function(),
       formatCodeView: function()
     }}
   * @private
   */
  var FormatQuestions = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(),
         formatCodeView: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (FormatQuestions.init)
       * ---------------------------------------------
       * initialize FormatQuestions
       */
      init: function() {
        init();
      }
    };

    /**
     * ---------------------------------------------
     * Private Format (formatted)
     * ---------------------------------------------
     * saves the content for each question
     * @type {{
         id: {
           flag: boolean,
           content: string
         },
         source: {
           flag: boolean,
           content: string
         },
         complete: {
           flag: boolean,
           content: string
         },
         category: {
           flag: boolean,
           main: {
             flag: boolean,
             h3: string,
             p: string
           },
           sub: {
             flag: boolean,
             h3: string,
             p: string
           }
         },
         solution: {
           error: boolean,
           code: string,
           height: number
         },
         output: {
           flag: boolean,
           content: string
         },
         links: {
           flag: boolean,
           content: Array.<{
             href: string,
             name: string
           }>
         }
       }}
     * @private
     */
    var formatted;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * converts questions to html
     * @type {function()}
     * @private
     */
    function init() {
      // Declare method variables
      var i;
      // Format the questions
      for (i=0; i<qLen; i++) {
        clearFormat();
        formatID(i);
        formatSource(questions[i].source);
        formatComplete(questions[i].complete);
        formatCategory(questions[i].mainCat, questions[i].subCat);
        formatSolution(questions[i].solution, i);
        formatOutput(questions[i].solution);
        formatLinks(questions[i].links);
        // Save formatted question
        configuration.content.push(formatted);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (clearFormat)
     * ---------------------------------------------
     * clears the previous question format
     * @type {function()}
     * @private
     */
    function clearFormat() {
      // Clear formatted
      formatted = {
        id: {
          flag: false,
          content: ''
        },
        source: {
          flag: false,
          content: ''
        },
        complete: {
          flag: false,
          content: ''
        },
        category: {
         flag: false,
          main: {
            flag: false,
            h3: '',
            p: ''
          },
          sub: {
            flag: false,
            h3: '',
            p: ''
          }
        },
        solution: {
          error: false,
          code: '',
          height: 0
        },
        output: {
          flag: false,
          content: ''
        },
        links: {
          flag: false,
          content: []
        }
      };
    }

    /**
     * ---------------------------------------------
     * Private Method (formatID)
     * ---------------------------------------------
     * formats the question id
     * param: the question index (number)
     * @type {function(number)}
     * @private
     */
    function formatID(i) {
      // Declare method variables
      var flag, id;
      // Set flag and id
      flag = configuration.questionFormat.id;
      id = '';
      if (flag) {
        // Save question id
        id = i + 1;
        // Ensure id length is min of 3
        id = ( (id < 10) ?
          '00' + id : (id < 100) ?
            '0' + id : '' + id
        );
      }
      // Save format
      formatted.id.flag = flag;
      formatted.id.content = id;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSource)
     * ---------------------------------------------
     * formats the question source
     * param: the question source (string)
     * @type {function(string)}
     * @private
     */
    function formatSource(sourceID) {
      // Declare method variables
      var sLen, flag;
      // Save app sources length and flag
      sLen = sources.len;
      flag = (sLen > 0 && configuration.questionFormat.source);
      // Save format
      formatted.source.flag = flag;
      formatted.source.content = ( (flag) ?
        sources.list[sourceID] : ''
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (formatComplete)
     * ---------------------------------------------
     * formats the question completion status
     * param: the question complete value (boolean)
     * @type {function(boolean)}
     * @private
     */
    function formatComplete(completed) {
      // Declare method variables
      var flag;
      // Save flag
      flag = configuration.questionFormat.complete;
      // Save format
      formatted.complete.flag = flag;
      formatted.complete.content = ( (!configuration.questionFormat.complete) ?
        '' : (completed) ? 'Yes' : 'No'
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (formatCategory)
     * ---------------------------------------------
     * formats the question categories
     * param: the main question's categories (array of strings)
     * param: the sub question's categories (array of strings)
     * @type {function(Array.<string>, Array.<string>)}
     * @private
     */
    function formatCategory(main, sub) {
      // Declare method variables
      var flag, cLen, mLen, sLen, i, id, subCats;
      // Save the length of all the main categories and
      //  the question's main and sub categories
      cLen = categories.len.main;
      mLen = main.length;
      sLen = sub.length;
      // Save flags
      flag = {
         cat: (cLen > 0 && configuration.questionFormat.category),
        main: (mLen > 0),
         sub: (sLen > 0)
      };
      formatted.category.flag = flag.cat;
      formatted.category.main.flag = flag.main;
      formatted.category.sub.flag  = flag.sub;
      // If (a main category exists and category config enabled)
      if (flag.cat) {
        // If (question has main categories)
        // Then {save main category format}
        if (flag.main) {
          formatted.category.main.h3 = 'Main ' +
          ( (mLen > 1) ? 'Categories:' : 'Category:' );
          // Find matching main category names
          for (i=0; i<mLen; i++) {
            formatted.category.main.p += (i === 0) ? '' : ', ';
            formatted.category.main.p += categories.main[main[i]];
          }
        }
        // If (question has sub categories)
        // Then {save sub category format}
        if (sLen > 0) {
          formatted.category.sub.h3 = 'Sub ' +
          ( (sLen > 1) ? 'Categories:' : 'Category:' );
          // Find matching sub category names
          for (i=0; i<sLen; i++) {
            formatted.category.sub.p += (i === 0) ? '' : ', ';
            loop:
            for (id in categories.sub) {
              // If (property not native)
              if ( categories.sub.hasOwnProperty(id) ) {
                // Save sub category objects
                subCats = categories.sub[id];
                // If (property exists)
                if (typeof subCats[sub[i]] === 'string') {
                  formatted.category.sub.p += subCats[sub[i]];
                  break loop;
                }
              }
            }
          }
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSolution)
     * ---------------------------------------------
     * formats the question solution
     * param: the question solution (function)
     * param: the question index (number)
     * @type {function(Object, number)}
     * @private
     */
    function formatSolution(solution, i) {
      // Declare method variables
      var error, code, height;
      // Save error
      error = (typeof solution !== 'function');
      // If (no error)
      // Then {prettify code}
      if (!error) {
        code = PrettifyCode.init(solution);
        // Calculate the pre element's div container height
        height = code.lineCount * configuration.prettyCode.lineHeight +
        configuration.prettyCode.prePadding.top + configuration.prettyCode.prePadding.bottom;
      }
      // Save format
      formatted.solution.error  = error;
      formatted.solution.code   = (error) ? '' : code.result;
      formatted.solution.height = (error) ?  0 : height;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatOutput)
     * ---------------------------------------------
     * formats the output of the question solution
     * param: the question solution (function)
     * @type {function(Object)}
     * @private
     */
    function formatOutput(solution) {
      // Declare method variables
      var flag, output;
      // Save flag
      flag = (typeof solution === 'function' &&
              configuration.questionFormat.output);
      // Save output
      output = (flag) ? solution() : '';
      output = (typeof output !== 'string') ? String(output) : output;
      // Save format
      formatted.output.flag = flag;
      formatted.output.content = output;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatLinks)
     * ---------------------------------------------
     * formats the question links
     * param: the links (array of objects)
     * @type {function(Array.<Object>)}
     * @private
     */
    function formatLinks(links) {
      // Declare method variables
      var flag, linksLen, i;
      // Save link length
      linksLen = links.length;
      // Save flag
      flag = (linksLen > 0 && configuration.questionFormat.links);
      // Save formatted links
      if (flag) {
        for (i=0; i<linksLen; i++) {
          formatted.links.content.push({
            href: links[i].href,
            name: links[i].name
          });
        }
      }
      else {
        formatted.links.content = [];
      }
      formatted.links.flag = flag;
    }

    // END CLASS: FormatQuestions
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (PrettifyCode)
   * ---------------------------------------------
   * converts a javascript function to a formatted
      string of html list items where each item is
      a line of code and adds span tags to each
      line to mark every piece of js syntax
   * @type {function(): {
       init: function(Object): {
            result: string,
         lineCount: number
       }
     }}
   * @private
   */
  var PrettifyCode = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(Object): {
              result: string,
           lineCount: number
         }
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (PrettifyCode.init)
       * ---------------------------------------------
       * initialize PrettifyCode
       * param: a js function (function)
       */
      init: function(f) {
        return init(f);
      }
    };

    /**
     * ---------------------------------------------
     * Private Variable (linePadding)
     * ---------------------------------------------
     * the pixel count for the padding of each line
     * @const
     * @type {number}
     * @private
     */
    var linePadding = 20;

    /**
     * ---------------------------------------------
     * Private Variable (paddingLevel)
     * ---------------------------------------------
     * the current line padding level
     * @type {number}
     * @private
     */
    var paddingLevel;

    /**
     * ---------------------------------------------
     * Private Variable (likelyRegex)
     * ---------------------------------------------
     * characters that if preceding a '/' are likely
        a regular expression
     * @const
     * @type {Array.<string>}
     * @private
     */
    var likelyRegex = ['(','[','{',';','*','/','%',
                       '+','-','<','>','&','^','|',
                       '=', '!'];

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * list of valid plain number characters
     * @const
     * @type {string}
     * @private
     */
    var plainNumbers = /[0-9\.]/;

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * list of valid hex number characters
     * @const
     * @type {string}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * list of valid starting identifier characters
     * @const
     * @type {string}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * list of valid identifier characters
     * @const
     * @type {string}
     * @private
     */
    var identifiers = /[a-z0-9_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (keywords)
     * ---------------------------------------------
     * list of keywords
     * @const
     * @type {{
         defining: Array.<string>,
         reserved: Array.<string>,
         natives: Array.<string>,
         values: Array.<string>,
         client: Array.<string>,
         jquery: Array.<string>
       }}
     * @private
     */
    var keywords = {
      defining: ['class', 'const', 'function', 'var'],
      reserved: ['abstract', 'arguments', 'boolean',
        'break', 'byte', 'case', 'catch', 'char',
        'const', 'continue', 'debugger', 'default',
        'delete', 'do', 'double', 'else', 'enum',
        'export', 'extends', 'final', 'finally',
        'float', 'for', 'goto', 'if', 'implements',
        'import', 'in', 'instanceof', 'int', 'interface',
        'item', 'let', 'long', 'native', 'new','package',
        'private', 'protected', 'public', 'return',
        'short', 'static', 'super', 'switch',
        'synchronized', 'this', 'throw', 'throws',
        'transient', 'try', 'typeof', 'void', 'volatile',
        'while', 'with', 'yield'],
      natives: ['abs', 'acos', 'Array', 'asin', 'atan',
        'atan2', 'Boolean', 'ceil', 'charAt', 'charCodeAt',
        'clearInterval', 'clearTimeout', 'concat', 'cos',
        'Date', 'decodeURI', 'decodeURIComponent',
        'encodeURI', 'encodeURIComponent', 'escape', 'eval',
        'exp', 'floor', 'fromCharCode', 'getDate', 'getDay',
        'getFullYear', 'getHours', 'getMilliseconds',
        'getMinutes', 'getMonth', 'getSeconds',
        'getSelection', 'getTime', 'getTimezoneOffset',
        'getUTCDate', 'getUTCDay', 'getUTCFullYear',
        'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes',
        'getUTCMonth', 'getUTCSeconds', 'getYear',
        'hasOwnProperty', 'Image', 'indexOf', 'isArray',
        'isFinite', 'isNaN', 'isPrototypeOf', 'join',
        'lastIndexOf', 'length', 'match', 'Math', 'max', 'min',
        'Number', 'Object', 'parse', 'parseFloat',
        'parseInt', 'pop', 'pow', 'preference', 'print',
        'prototype', 'push', 'random', 'RegExp', 'replace',
        'reset', 'resizeBy', 'resizeTo', 'reverse', 'round',
        'search', 'select', 'setDate', 'setFullYear',
        'setHours', 'setMilliseconds', 'setInterval',
        'setMinutes', 'setMonth', 'setSeconds', 'setTime',
        'setTimeout', 'setUTCDate', 'setUTCFullYear',
        'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes',
        'setUTCMonth', 'setUTCSeconds', 'setYear', 'shift',
        'sin', 'slice', 'sort', 'splice', 'split', 'sqrt',
        'String', 'substr', 'substring', 'tan', 'test',
        'toGMTString', 'toLocaleString', 'toLowerCase',
        'toSource', 'toString', 'toUpperCase', 'toUTCString',
        'unescape', 'unshift', 'unwatch', 'UTC', 'valueOf',
        'watch', 'write', 'writeln'],
      values: ['false', 'Infinity', 'Nan', 'null', 'true',
        'undefined'],
      client: ['alert', 'all', 'anchor', 'anchors', 'appendChild',
        'area', 'assert', 'assign', 'back', 'big', 'blink', 'blur',
        'body', 'bold', 'button', 'byteToString', 'captureEvents',
        'checkbox', 'className', 'clearInterval', 'clearTimeout', 'click',
        'clientInformation', 'close', 'closed', 'confirm', 'console',
        'constructor', 'createElement', 'crypto', 'decodeURI',
        'decodeURIComponent', 'defaultStatus', 'disableExternalCapture',
        'document', 'element', 'elements', 'embed', 'embeds',
        'enableExternalCapture', 'encodeURI', 'encodeURIComponent',
        'escape', 'event', 'fileUpload', 'find', 'fixed', 'focus',
        'fontcolor', 'fontsize', 'form', 'forms', 'forward',
        'frame', 'frames', 'frameRate', 'getElementById',
        'getElementsByClassName', 'getElementsByTagName',
        'getOptionValueCount', 'getOptionValue', 'go', 'group',
        'groupCollapsed', 'groupEnd', 'handleEvent', 'hidden',
        'history', 'home', 'id', 'image', 'images', 'innerHeight',
        'innerHTML', 'innerWidth', 'italics', 'javaEnabled', 'layer',
        'layers', 'link', 'location', 'log', 'mimeTypes', 'moveAbove',
        'moveBelow', 'moveBy', 'moveTo', 'moveToAbsolute',
        'navigate', 'navigator', 'offscreenBuffering', 'open',
        'opener', 'options', 'outerHeight', 'outerWidth',
        'packages', 'pageXOffset', 'pageYOffset', 'parent',
        'password', 'pkcs11', 'plugins', 'prompt', 'propertyIsEnum',
        'radio', 'refresh', 'releaseEvents', 'reload', 'reset',
        'routeEvent', 'screen', 'screenX', 'screenY', 'scroll',
        'scrollBy', 'scrollTo', 'secure', 'select', 'self',
        'small', 'status', 'stop', 'strike', 'submit', 'sup',
        'taint', 'taintEnabled', 'text', 'textContent', 'textarea',
        'top', 'trace', 'unescape', 'untaint', 'window'],
      jquery: ['$', 'jQuery']
    };

    /**
     * ---------------------------------------------
     * Private Variable (commentOpen)
     * ---------------------------------------------
     * is a comment open
     * @type {boolean}
     * @private
     */
    var commentOpen;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * converts a javascript function to string with
        html markup
     * param: a function (function)
     * @type {function(Object): {
            result: string,
         lineCount: number
       }}
     * @private
     */
    function init(f) {
      // First: convert function to array of lines
      // Then: convert array of lines to a formatted string
      return formatLines( prepareArray(f) );
    }

    /**
     * ---------------------------------------------
     * Private Method (setPadding)
     * ---------------------------------------------
     * saves the line's padding level
     * param: the first line character (string)
     * param: the last line character (string)
     * @type {function(string, string): number}
     * @private
     */
    function setPadding(first, last) {
      var padding;
      // Adjust padding level
      switch (first) {
        case '}':
        case ']':
        case ')':
          --paddingLevel;
      }
      // Set current padding
      padding = paddingLevel * linePadding;
      // Adjust padding level
      switch (last) {
        case '{':
        case '[':
        case '(':
        case '?':
         ++paddingLevel;
      }
      return padding;
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLine)
     * ---------------------------------------------
     * removes extra spaces, sets the first and last
        line character, and registers empty lines
        for the supplied line of code
     * param: line of code (string)
     * @type {function(string): {
            line: string,
           first: string,
            last: string,
         padding: number,
           empty: boolean
       }}
     * @private
     */
    function prepareLine(l) {
      var i, len, last, line;
      // Convert line to array
      l = l.split('');
      // Save array length
      len  = l.length;
      // Save last index
      last = len - 1;
      // Set object with all line properties
      line = {
           code: '',
          first: '',
           last: '',
        padding:  0,
          empty: false
      };
      // Trim starting whitespace
      looper1:
      for(i=0; i<len; i++) {
        if (l[i] === ' ') {
          l[i] = '';
        }
        else {
          line.first = l[i];
          break looper1;
        }
        if (i === last) {
          line.empty = true;
        }
      }
      // If (line is not empty)
      // Then {trim end whitespace}
      if (!line.empty) {
        looper2:
        for(i=last; i>=0; i--) {
          if (l[i] === ' ') {
            l[i] = '';
          }
          else {
            line.last = l[i];
            break looper2;
          }
        }
      }
      // Save line string
      line.code = l.join('');
      return line;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatLines)
     * ---------------------------------------------
     * formats the supplied lines of code
     * param: array of code lines (array)
     * @type {function(Array.<string>): {
            result: string,
         lineCount: number
       }}
     * @private
     */
    function formatLines(lines) {
      // Declare method variables
      var i, line, lineCount;
      // Set level of padding to 0
      paddingLevel = 0;
      // Set open comment indicator to false
      commentOpen  = false;
      // Save the count of lines
      lineCount = lines.length;
      // Loop through lines
      for (i=0; i<lines.length; i++) {
        // Prepare line for formatting
        line = prepareLine(lines[i]);
        // Set line padding
        if (!line.empty) {
          line.padding = setPadding(line.first, line.last);
        }
        // Highlight syntax
        if (!line.empty) {
          line.code = HighlightSyntax.init(line.code);
        }
        lines[i] = '<li style="padding-left:' +
        line.padding +'px">'+ line.code +'</li>';
      }
      return { result: lines.join(''), lineCount: lineCount };
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareArray)
     * ---------------------------------------------
     * converts a function into an array of strings
        where each value represents a line of code
        and replaces all tabs with spaces
     * param: a function (function)
     * @type {function(Object): Array.<string>}
     * @private
     */
    function prepareArray(f) {
      var code;
      // First: convert function to string
      // Then: standardize all line breaks
      code = String(f).replace(/\r\n?/g, '\n');
      // First: replace all tabs with spaces
      // Then: convert string to array of lines
      // Then: return result
      return code.replace(/\t/g, ' ').split('\n');
    }

    /**
     * ---------------------------------------------
     * Private Class (HighlightSyntax)
     * ---------------------------------------------
     * adds spans around reserved code characters to
        highlight specific syntax for a line of code
     * @type {function(): {
         execute: function(string): string
       }}
     * @private
     */
    var HighlightSyntax = (function() {

      /**
       * ---------------------------------------------
       * Private Variable (__return)
       * ---------------------------------------------
       * the public methods of this class
       * @type {{
           init: function(string): string
         }}
       * @private
       */
      var __return = {
        /**
         * ---------------------------------------------
         * Public Method (HighlightSyntax.init)
         * ---------------------------------------------
         * initializes HighlightSyntax
         * param: a line of code (string)
         */
        init: function (l) {
          return _init(l);
        }
      };

      /**
       * ---------------------------------------------
       * Private Variable (newLine)
       * ---------------------------------------------
       * the current line of code
       * @type {string|Array.<string>}
       * @private
       */
      var newLine;

      /**
       * ---------------------------------------------
       * Private Variable (line)
       * ---------------------------------------------
       * the original line of code
       * @type {string|Array.<string>}
       * @private
       */
      var line;

      /**
       * ---------------------------------------------
       * Private Variable (len)
       * ---------------------------------------------
       * the length of the line of code
       * @type {number}
       * @private
       */
      var len;

      /**
       * ---------------------------------------------
       * Private Method (_init)
       * ---------------------------------------------
       * adds highlighting spans to a line of code
       * @type {function(string): string}
       * @private
       */
      function _init(l) {
        // Convert line from string to array
        line = l.split('');
        // Save line array length
        len  = line.length;
        // Save copy of line array
        // for final output
        newLine = line.slice();
        // Return formatted line
        return formatLine();
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLine)
       * ---------------------------------------------
       * adds highlighting spans to line of code
       * @type {function(): string}
       * @private
       */
      function formatLine() {
        var i, preceding;
        // Set index to start
        i = 0;
        // If (comment is already open by prior line)
        // Then {handle line comment start}
        if (commentOpen) {
          i = formatCommentClose(i);
          // If (whole line is comment)
          // Then {return newLine}
          if (i === len) {
            return newLine.join('');
          }
        }
        // Find and label comments, strings,
        // regexs, spaces, brackets, operators,
        // commas, semicolons, colons, periods,
        // numbers, keywords, identifiers, and
        // miscellaneous
        for(; i<len; i++) {
          switch (line[i]) {
            case '/':
              // Check if comment, regex, or division
              switch (line[i + 1]) {
                // Handle line comments
                case '/':
                  i = formatLineComment(i);
                break;
                // Handle comment opens
                case '*':
                  i = formatCommentOpen(i);
                break;
                default:
                  // Save preceding character
                  // If (index is line start)
                  // Then {set preceding to force regex= true}
                  preceding = ( (i === 0) ?
                    '(' : (line[i - 1] === ' ') ?
                      line[i - 2] : line[i - 1]
                  );
                  // If (regex statement)
                  // Then {handle regex statement}
                  // Else {handle division operator}
                  // Note: Current bugs include identifying
                  // the preceding binary operators 'in' and
                  // 'instanceof' as well as a one line if
                  // statement (e.g. if (i) /foo/.exec())
                  // and the use of the preceding unary
                  // operators '++' and '--' (e.g. i++ / x)
                  if (likelyRegex.indexOf(preceding) !== -1) {
                    i = formatRegex(i);
                  }
                  else {
                    i = formatOperator(i);
                  }
              }
            break;
            // Handle strings
            case '\'':
            case '"':
              i = formatString(i);
            break;
            // Handle spaces
            case ' ':
              i = formatSpace(i);
            break;
            // Handle brackets
            case '{':
            case '[':
            case '(':
            case ')':
            case ']':
            case '}':
              i = formatBracket(i);
            break;
            // Handle operators
            case '*':
            case '%':
            case '+':
            case '-':
            case '<':
            case '>':
            case '&':
            case '^':
            case '|':
            case '=':
            case '!':
            case '~':
            case '?':
              i = formatOperator(i);
            break;
            // Handle commas
            case ',':
              i = formatComma(i);
            break;
            // Handle semicolons
            case ';':
              i = formatSemicolon(i);
            break;
            // Handle colons
            case ':':
              i = formatColon(i);
            break;
            // Handle periods
            case '.':
              i = formatPeriod(i);
            break;
            // Handle numbers
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
              i = formatNumber(i);
            break;
            default:
              // If (character is an identifier start)
              // Then {handle identifiers and keywords}
              // Else {handle miscellaneous}
              if ( identifierStart.test(line[i]) ) {
                i = formatIdentifier(i);
              }
              else {
                i = formatMisc(i);
              }
          }
        }
        return newLine.join('');
      }

      /**
       * ---------------------------------------------
       * Private Method (sanitizeCharacter)
       * ---------------------------------------------
       * inserts html entities when needed
       * param: the current line array index (number)
       * @type {function(number)}
       * @private
       */
      function sanitizeCharacter(i) {
        // Replace character with html entity
        switch (line[i]) {
          case '>':
            newLine[i] = '&gt;';
          break;
          case '<':
            newLine[i] = '&lt;';
          break;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipComment)
       * ---------------------------------------------
       * moves the index to the end of comment
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipComment(i) {
        // Loop through line starting at index
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return index}
          if (i >= len) {
            return i;
          }
          // Check character
          switch (line[i]) {
            // Possible comment end
            case '*':
              // If (comment ends)
              // Then {return index}
              if (line[i + 1] === '/') {
                return ++i;
              }
            break;
            // Sanitization needed
            case '>':
            case '<':
              sanitizeCharacter(i);
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipString)
       * ---------------------------------------------
       * moves the index to the end of the string
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipString(i) {
        // Declare method variables
        var b;
        // Save bracket type
        b = line[i];
        // Find string end
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return last index}
          if (i === len) {
            return --i;
          }
          // Check character
          switch (line[i]) {
            // Possible string end
            case b:
              // If (string ends)
              // Then {return index}
              if (line[i - 1] !== '\\') {
                return i;
              }
            break;
            // Sanitization needed
            case '>':
            case '<':
              sanitizeCharacter(i);
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipSpace)
       * ---------------------------------------------
       * moves the index to the end of the space sequence
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipSpace(i) {
        while (true) {
          // If (next index not space)
          // Then {return index}
          if (line[i + 1] !== ' ') {
            return i;
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipNumber)
       * ---------------------------------------------
       * moves the index to the end of the number
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipNumber(i) {
        var start, numbers;
        // Save first two spots in number sequence
        start = line[i] + line[i + 1];
        // Set number reference list
        numbers = ( (start === '0x' || start === '0X') ?
          hexNumbers : plainNumbers
        );
        while (true) {
          // If (last index)
          // Then {return index}
          if (i === (len - 1)) {
            return i;
          }
          // If (next index not number)
          // Then {return index}
          if ( !numbers.test(line[i + 1]) ) {
            return i;
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * moves the index to the end of the identifier
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipIdentifier(i) {
        var iName;
        // Start empty array to contain each
        // character of the identifier name
        iName = [];
        while (true) {
          // Add character to iName
          iName.push(line[i]);
          // If (last index)
          // Then {return index and name}
          if (i === (len - 1)) {
            return { index: i, name: iName.join('') };
          }
          // If (next index not identifier)
          // Then {return index and name}
          if ( !identifiers.test(line[i + 1]) ) {
            return { index: i, name: iName.join('') };
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentOpen)
       * ---------------------------------------------
       * opens a comment, adds comment spans, and 
          moves the index to the end of comment
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatCommentOpen(i) {
        // Add comment span
        newLine[i] = '<span class="comment">/';
        // Move index to end of comment
        i = skipComment(++i);
        // If (comment not closed by line end)
        if (i === len) {
          // Set commentOpen to true
          commentOpen = true;
          // Move index to last value
          --i;
        }
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentClose)
       * ---------------------------------------------
       * adds comment spans and moves the index to the
          end of the comment for a line inheriting an
          already open comment (i.e. line began as a
          comment)
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatCommentClose(i) {
        // Add comment span to line start
        newLine[i] = ( (line[i] === '*') ?
          ' <span class="comment">*' :
          '<span class="comment">' + line[i]
        );
        // If (start is a comment end)
        // Then {update line and return next index}
        if (line[0] === '*' && line[1] === '/') {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[1] += '</span>';
          // Return next index
          return 3;
        }
        // Move index to comment end
        i = skipComment(i);
        // If (index exists)
        if (i < len) {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[i] += '</span>';
          // Move index to next value
          ++i;
        }
        else {
          // Add closing span to line end
          newLine[i - 1] += '</span>';
        }
        // Return next index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLineComment)
       * ---------------------------------------------
       * adds comment spans and moves index to line end
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatLineComment(i) {
        // Add comment span
        newLine[i] = '<span class="comment">/';
        // Moves index to line end
        i = len - 1;
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatString)
       * ---------------------------------------------
       * adds string spans and moves the index to the
          end of string
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatString(i) {
        // Add string span
        newLine[i] = '<span class="string">' + line[i];
        // Move index to end of string
        i = skipString(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatRegex)
       * ---------------------------------------------
       * adds regex spans and moves the index to the
          end of regex
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatRegex(i) {
        var u;
        // Add regex span
        newLine[i] = '<span class="regex">/';
        // Move index to the closing forward slash
        i = skipString(i);
        // Start empty array to contain
        // each used regex flags
        u = [];
        // Check for regex flags after
        // closing forward slash
        looper:
        while (true) {
          // All regex flags have been used
          if (u.length === 3) {
            break looper;
          }
          switch (line[i + 1]) {
            case 'g':
            case 'i':
            case 'm':
              // Verify flag has not been repeated
              if (u.indexOf(line[i + 1]) !== -1) {
                break looper;
              }
              // Add flag to used flags array
              u.push(line[i + 1]);
              ++i;
            break;
            default:
              break looper;
          } 
        }
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSpace)
       * ---------------------------------------------
       * adds space spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatSpace(i) {
        // Add space span
        newLine[i] = '<span class="space"> ';
        // Move index to end of space sequence
        i = skipSpace(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatBracket)
       * ---------------------------------------------
       * adds bracket spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatBracket(i) {
        // Add bracket spans
        newLine[i] = '<span class="bracket">'+ line[i] +'</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatOperator)
       * ---------------------------------------------
       * adds operator spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatOperator(i) {
        // Declare method variables
        var sanitized;
        // Sanitize the operator
        sanitized = ( (line[i] === '<') ?
          '&lt;' : (line[i] === '>') ?
            '&gt;' : line[i]
        );
        // Add operator spans
        newLine[i] = '' +
        '<span class="operator">' +
          sanitized +
        '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatComma)
       * ---------------------------------------------
       * adds comma spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatComma(i) {
        // Add comma spans
        newLine[i] = '<span class="comma">,</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSemicolon)
       * ---------------------------------------------
       * adds semicolon spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatSemicolon(i) {
        // Add semicolon spans
        newLine[i] = '<span class="semicolon">;</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatColon)
       * ---------------------------------------------
       * adds colon spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatColon(i) {
        // Add colon spans
        newLine[i] = '<span class="colon">:</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatPeriod)
       * ---------------------------------------------
       * adds period spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatPeriod(i) {
        // Add period spans
        newLine[i] = '<span class="period">.</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatNumber)
       * ---------------------------------------------
       * adds number spans and moves the index to the
          end of number
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatNumber(i) {
        // Add number span
        newLine[i] = '<span class="number">' + line[i];
        // Move index to end of number
        i = skipNumber(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatIdentifier)
       * ---------------------------------------------
       * finds complete identifier, checks whether it
          is a keyword, adds correct span tags, and
          moves the index to end of identifier
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatIdentifier(i) {
        var identifier;
        // Save identifier name and index end
        // { index: 0, name: '' }
        identifier = skipIdentifier(i);
        // Check if keyword exists
        // Add corresponding span
        switch (true) {
          case (keywords.defining.indexOf(identifier.name) !== -1):
            if (identifier.name == 'function') {
              if ((line[identifier.index + 1] === '(') ||
                  (line[identifier.index + 1] === ' ' &&
                   line[identifier.index + 2] === '(')) {
                newLine[i] = '<span class="reservedKeyword">' + line[i];
              }
              else {
                newLine[i] = '<span class="definingKeyword">' + line[i];
              }
            }
            else {
              newLine[i] = '<span class="definingKeyword">' + line[i];
            }
          break;
          case (keywords.reserved.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="reservedKeyword">' + line[i];
          break;
          case (keywords.natives.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="nativeKeyword">' + line[i];
          break;
          case (keywords.values.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="valueKeyword">' + line[i];
          break;
          case (keywords.client.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="clientKeyword">' + line[i];
          break;
          case (keywords.jquery.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="jqueryKeyword">' + line[i];
          break;
          default:
            newLine[i] = '<span class="identifier">' + line[i];
        }
        // Add close span
        newLine[identifier.index] += '</span>';
        // Return index
        return identifier.index;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatMisc)
       * ---------------------------------------------
       * adds misc spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatMisc(i) {
        // Add misc spans
        newLine[i] = '<span class="misc">' + line[i] + '</span>';
        // Return index
        return i;
      }

      // END CLASS: HighlightSyntax
      return __return;
    }());

    // END CLASS: PrettifyCode
    return _return;
  }());

// END WEB WORKER
}(questions));
//sedFlagWorkerEnd
// END USER DATA
}());
//sedFlagEnd
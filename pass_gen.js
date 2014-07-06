// The MIT License (MIT)
// Copyright (c) 2014 John Franklin Pavley
// see LICENSE.txt for full license text

// PassGen: Password Generator
// pass_gen.js

// REALLY IMPORTANT NOTE:
// DO NOT USE THIS CODE FOR GENERATING PASSWORDS WITHOUT
// MAJOR MODIFICATION. THIS CODE IS FOR EXAMPLE ONLY.
// EVEN I DON'T USE TO GENERATE PASSWORDS!!

// pass_gen passwords have 3 components:
// lstr: A string of letters
// nstr: A string of numbers
// sstr: A string of symbols

// lstr, nstr, sstr can be any length, in any order, and repated in any pattern
// lstr capitalization varies randomly

// Paramerts passed in from the command line are used to specify the length,
// order, and repetitions of each component

// A pass_gen might look like this: Xwu@#$cQk691 or Cc91Bp$^ or A1&0c6#3
// Xwu@#$cQk691 has a string length of 3 and a pattern of (lstr, sstr, lstr, 
// nstr)
// Cc91Bp$^ has a string length of 2 and a pattern of (lstr, sstr, lstr, nstr)
// A1&0c6#3 has a string length of 1 and a pattern of (lstr, nstr, sstr, nstr,
// lstr, nstr, sstr, nstr)

// pass_gen syntax

// pass_gen [length, pattern, cap]
// - length is an integer from 1 to 100
// - pattern is a string composed of the letters l, s, and n such as lsn or 
//   lnsnlnsn and specifies the pattern of components
// - cap is a flag that controls capitalization of lstrs: 0 (random), 1 (none)

// pass_gen example usage

// > pass_gen
// > Xwu@#$cQk691

// > pass_gen 2 lsln 0
// > Cc91Bp$^

// > pass_gen 1 lnsnlnsn 0
// > A1&0c6#3
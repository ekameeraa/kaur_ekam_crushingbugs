# kaur_ekam_crushingbugs
working on bugs

Installation: Based on the instructions, it looks like there are two bugs that need to be fixed in the puzzle game:
1. The ability to drag and drop more than one puzzle piece into a drop zone.
2. Pieces appearing in the drop zones on reset/choosing a new puzzle should be removed/re-parented back to the drag zone.

Usage
1. To fix the first bug, you can modify the drop function to check if there is already a piece in the drop zone before appending the new piece to the drop zone. If there is already a piece, you can return the piece to the drag zone.

2. To fix the second bug, you can create a separate function to reset the puzzle. This function should loop through each drop zone and move the puzzle piece back to the drag zone.

Contributing:
1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D


Credits
Ekampreet Kaur

License
TODO: Write license
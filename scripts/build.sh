cd .. # Move to root
echo "Running in directory $(pwd)"
mkdir dist
cp index.html ./dist
cp tootformat.html ./dist
cp instructions.html ./dist
cp instructions.pdf ./dist

# Copy the dirs
cp -R ./resources ./dist/
cp -R ./assets ./dist/

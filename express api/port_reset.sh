sudo lsof -i:443

echo -n "PID of node: "
read pid

sudo kill $pid

echo "Restarting Node"
sudo node index.js
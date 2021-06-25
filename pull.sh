echo "Pulling..."
git pull

git_hash=$(git rev-parse HEAD)
webhook_url="WEBHOOK_URL"
curl -X POST -H "Content-Type: application/json" -d "{\"content\":\"<@514866599400833034>\n \",\"embeds\": [{\"title\":\"Repo Pulled\",\"description\":\"The Repo has been pulled! You can probably do whatever you were gonna do now.\",\"color\": 13054771, \"footer\":{\"text\": \"$git_hash\"}}]}" "$webhook_url"

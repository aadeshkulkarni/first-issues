import fetch from 'node-fetch';
import fs from 'fs';
import magicRepos from "./magic-repos.json" with { type: "json" };

const githubToken = process.env.GITHUB_TOKEN || "";
const date30DaysAgo = new Date();
date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
const dateString = date30DaysAgo.toISOString().split('T')[0];

const query = `stars:10001..100000 pushed:>${dateString} language:c language:c++ language:java language:javascript language:go language:rust language:python language:c# language:typescript good-first-issues:>3`;
const perPage = 100;
let currentPage = 1;
const allRepos = [];

const fetchRepositories = async (page) => {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;

  const options = {
    method: 'GET',
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(perPage," <- page | count -> ",data.items.length);
    if (data.items) {
      const repos = data.items.map((repo) => repo.html_url.toLowerCase().replace('https://github.com/', ''));
      allRepos.push(...repos);

      // Check if we need to fetch more pages
      if (data.items.length === perPage) {
        currentPage++;
        await fetchRepositories(currentPage);
      } else {
        // Write all repos to file once all pages have been fetched
        fs.writeFile('magic-repos.json', JSON.stringify(allRepos.sort(), null, 2), (err) => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('Repositories data written to magic-repos.json');
          }
        });
      }
    } else {
      console.log('No repositories found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function sortRepos(){
    console.log("MagicRepos length: ",magicRepos.length);
    fs.writeFile('magic-repos.json', JSON.stringify(magicRepos.sort(), null, 2), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Repositories data written to magic-repos.json');
        }
    });
}

// Start fetching from the first page
// fetchRepositories(currentPage);
// sortRepos();
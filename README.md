[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

Welcome! 👋🏼

**First Issues** is an initiative to curate easy pickings from open-source projects, so developers who've never contributed to open-source can get started quickly.

Open-source maintainers are always looking to get more people involved, but new developers generally think it's challenging to become a contributor. We believe getting developers to fix super-easy issues removes the barrier for future contributions. This is why Good First Issue exists.

## Adding a new project

You're welcome to add a new project in FirstIssues.dev, and we encourage all projects &mdash; old and new, big and small.

Follow these simple steps:

- Our goal is to narrow down projects for new open-source contributors. To maintain the quality of projects in Good First Issue, please make sure your GitHub repository meets the following criteria:

  - It has at least three issues with the `good first issue` label. This label is already present on all repositories by default. If not, you can follow the steps [here](https://help.github.com/en/github/managing-your-work-on-github/applying-labels-to-issues-and-pull-requests).

  - It has at least 10 contributors.

  - It contains a README.md with detailed setup instructions for the project, and a CONTRIBUTING.md with guidelines for new contributors.

  - It is actively maintained.

- Add your repository's path (in lexicographic order) in [data/repos.json](data/repos.json).

- Create a new pull-request. Please add the link to the issues page of the repository in the PR description. Once the pull request is merged, the changes will be live on [firstissues.dev](https://firstissues.dev).

## Setting up the project locally

FirstIssues is built using NextJs.

To contribute new features and changes to the website, you would want to run the app locally. Please follow these steps:

1. Clone the project locally. Make sure you have Python 3 and a recent version of Node.js installed on your computer. 

2. Add GITHUB_TOKEN in .env file

3. Build the front-end app and start the development server.

```bash
$ npm install # install the dependencies
$ npm run dev # start the development server
```

The app should spin up on your browser.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/aadeshkulkarni/first-issues.svg?style=for-the-badge
[contributors-url]: https://github.com/aadeshkulkarni/first-issues/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/aadeshkulkarni/first-issues.svg?style=for-the-badge
[forks-url]: https://github.com/aadeshkulkarni/first-issues/network/members
[stars-shield]: https://img.shields.io/github/stars/aadeshkulkarni/first-issues.svg?style=for-the-badge
[stars-url]: https://github.com/aadeshkulkarni/first-issues/stargazers
[issues-shield]: https://img.shields.io/github/issues/aadeshkulkarni/first-issues.svg?style=for-the-badge
[issues-url]: https://github.com/aadeshkulkarni/first-issues/issues




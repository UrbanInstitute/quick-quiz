# Presidential Candidate Tax Quiz

Live URL
http://apps.taxpolicycenter.org.s3-website-us-east-1.amazonaws.com/features/presidential-candidate-tax-quiz/index.html

Stg URL
http://apps-stg.taxpolicycenter.org.s3-website-us-east-1.amazonaws.com/features/presidential-candidate-tax-quiz/index.html

## About

Forked from Urban's quick quiz generator tool. This is a pre-built repo.

See an [example quiz](http://urbaninstitute.github.io/quick-quiz/)

## Deploy

Deployments are triggered by merging changes into designated branches:

* `staging` branch deploys and overwrites all files at the staging url
* `master` brand does the same for the live site

## Workflow

Given that deploying code to the master branch automatically triggers a build and deploy. This repo is configured with some simple restrictions on the master branch. Developers need to sumbit (and accept) a Pull Request to submit code to the master branch. This is an extra step and is intended to add some necessary friction between fast-moving changes and the live site. Disable at your own risk.
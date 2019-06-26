/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
	render() {
		const { siteConfig, language = '' } = this.props;
		const { baseUrl, docsUrl } = siteConfig;
		const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
		const langPart = `${language ? `${language}/` : ''}`;
		const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

		const SplashContainer = props => (
			<div className="homeContainer">
				<div className="homeSplashFade">
					<div className="wrapper homeWrapper">{props.children}</div>
				</div>
			</div>
		);

		const ProjectTitle = () => (
			<h2 className="projectTitle">
				{siteConfig.headerTitle}
				<small className="header-title" >{siteConfig.tagline}</small>
			</h2>
		);

		const PromoSection = props => (
			<div className="section promoSection">
				<div className="promoRow">
					<div className="pluginRowBlock">{props.children}</div>
				</div>
			</div>
		);

		const Button = props => (
			<div className="pluginWrapper buttonWrapper">
				<a className="button" href={props.href} target={props.target}>
					{props.children}
				</a>
			</div>
		);

		return (
			<SplashContainer>
				<div className="inner">
					<img className="home-banner" src="img/banner4.png" />
					<ProjectTitle siteConfig={siteConfig} />

				</div>
				<div className="top-badges">
					<a href="https://codeclimate.com/github/pankod/next-boilerplate/maintainability">
						<img src="https://api.codeclimate.com/v1/badges/077c02d5cb9ec7d8a654/maintainability" />
					</a>

					<a href="https://codecov.io/gh/pankod/next-boilerplate">
						<img src="https://codecov.io/gh/pankod/next-boilerplate/branch/master/graph/badge.svg" />
					</a>
					<a href="https://travis-ci.org/pankod/next-boilerplate">
						<img src="https://travis-ci.org/pankod/next-boilerplate.svg?branch=master" alt="Build Status" />
					</a>
					<a href="https://david-dm.org/pankod/moleculerjs-boilerplate">
						<img src="https://david-dm.org/pankod/moleculerjs-boilerplate.svg" alt="Dependency Status" />
					</a>
					<a href="https://david-dm.org/pankod/moleculerjs-boilerplate#info=devDependencies">
						<img src="https://david-dm.org/pankod/moleculerjs-boilerplate/dev-status.svg" alt="devDependency Status" />
					</a>
				</div>
				{/* 	<PromoSection>
					<Button href={docUrl('getting-start.html')}>GET STARTED</Button>
				</PromoSection> */}
			</SplashContainer>
		);
	}
}

class Index extends React.Component {
	render() {
		const { config: siteConfig, language = '' } = this.props;
		const { baseUrl } = siteConfig;

		const Block = props => (
			<Container
				padding={['bottom', 'top']}
				id={props.id}
				background={props.background}>
				<GridBlock
					align={props.align}
					contents={props.children}
					layout={props.layout}
				/>
			</Container>
		);

		const FeatureCallout = () => (
			<div
				className="productShowcaseSection paddingBottom"
				style={{ textAlign: 'center' }}>
				<h2>Features </h2>
			</div>
		);

		const TryOut = () => (
			<Block id="try">
				{[
					{
						content:
							'Jest is a testing tool from Facebook that makes it easy to perform unit testing in JavaScript.',
						image: `${baseUrl}img/testing.png`,
						imageAlign: 'left',
						title: 'Jest',
					},
				]}
			</Block>
		);

		const LearnHow = () => (
			<Block background="light">
				{[
					{
						content:
							'Pankod boilerplate is shipped with a CLI tool to streamline the creation of new components.',
						image: `${baseUrl}img/boilerplate-cli.gif`,
						imageAlign: 'right',
						title: 'Built-in Project CLI',
					},
				]}
			</Block>
		);
		const LastFeature = () => (
			<Block background="light">
				{[
					{
						content:
							'Her servisin nasıl kullanılacağına dair protocal yayınlar.',
						image: `${baseUrl}img/clients.svg`,
						imageAlign: 'right',
						title: 'Service Clients'
					},
				]}
			</Block>
		);

		const Features = () => (
			<React.Fragment>
			<Block layout="fourColumn" align='center'>
				{[
					{
						content: 'Progressive microservices framework for Node.js.',
						image: `${baseUrl}img/moleculer-logo2.png`,
						imageAlign: 'top',
						title: 'Moleculer',
					},
					{
						content: 'Superset of JavaScript which primarily provides optional static typing, classes and interfaces.',
						image: `${baseUrl}img/typescript-logo.png`,
						imageAlign: 'top',
						title: 'TypeScript',
					},
					{
						content: 'TypeORM is specifically an ORM that converts data between JavaScript / TypeScript to a variety of databases',
						image: `${baseUrl}img/typeorm.png`,
						imageAlign: 'top',
						title: 'TypeORM',
						className:'orm'
					},
					{
						content: 'Create services, models and interfaces with one command by using built-in cli.',
						image: `${baseUrl}img/cli-logo.png`,
						imageAlign: 'top',
						title: 'Project CLI',
					}
			
		

				]}
			</Block>

			<Block layout="fourColumn" align='center'>
				{[
					
					{
						content: 'Jest is a testing tool from Facebook that makes it easy to perform unit testing in JavaScript.',
						image: `${baseUrl}img/jest-logo.png`,
						imageAlign: 'top',
						title: 'Jest',
					},
					{
						content: 'Create, deploy, and run applications by using docker containers.',
						image: `${baseUrl}img/docker2.png`,
						imageAlign: 'top',
						title: 'Docker',
					},
					{
						content: 'Tools that helps developers design, build, document, and consume RESTful Web services.',
						image: `${baseUrl}img/swagger.png`,
						imageAlign: 'top',
						title: 'Swagger',
					},
					{
						content: 'Linter for the JavaScript programming language.',
						image: `${baseUrl}img/eslint-logo.png`,
						imageAlign: 'top',
						title: 'Eslint',
					}
				]}
			</Block>
			</React.Fragment>
		);

	

		return (
			<div>
				<HomeSplash siteConfig={siteConfig} language={language} />
				<div className="mainContainer homeMain">
					<Features />
					<FeatureCallout />
					<LearnHow />
					<TryOut />
					<LastFeature />
				</div>
			</div>
		);
	}
}

module.exports = Index;

// <reference types="Cypress" />
import { CheckDrawerDisabled } from '../wp-module-support/drawer.cy';
import { CheckCardHeadingSubheading } from '../wp-module-support/header.cy';
import {
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel,
} from '../wp-module-support/sidebar.cy';

describe( 'Get Started Site Type Secondary', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding&flow=ecommerce#/wp-setup/step/get-started/site-secondary'
		);
		cy.wait( 3000 );
	} );

	it( 'Check if the Suppressed Drawer does not open on clicking Toggle Button', () => {
		CheckDrawerDisabled();
	} );

	it( 'Check if Header and Subheader shows up', () => {
		CheckCardHeadingSubheading( true );
	} );

	it( 'Check if `store` appears in heading', () => {
		cy.get('.nfd-step-card-heading')
			.should('be.visible')
			.contains('store');
	} );

	it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
		CheckIntroPanel( '__get-started-site-secondary', 'Store Type' );
		CheckIllustrationPanel();
		CheckInfoPanel();
		CheckHelpPanelLinks();
	} );

	it( 'Check selected category is visible and selected', () => {
		cy.get( '.category-scrolling-wrapper' ).should( 'be.visible' );
		cy.get( '.category-scrolling-wrapper__type-text' ).should(
			'contain',
			'Business'
		);
	} );

	it( 'Check only Business category is avaiable', () => {
		cy.get('.category-scrolling-wrapper__left-btn').should('not.exist');
		cy.get('.category-scrolling-wrapper__right-btn-icon').should('not.exist');
	} )

	it( 'Check different subCategories exist and is selectable', () => {
		let categoryCount = 0;
		const className = '.subCategoriesSection';
		cy.get( className ).should( 'be.visible' );
		const arr = cy.get( className.concat( ' div' ) );
		arr.each( () => {
			cy.get( className.concat( ' div' ) )
				.eq( categoryCount )
				.click()
				.should( 'have.class', 'chosenSecondaryCategory' );
			categoryCount += 1;
		} );
	} );

	it( 'Check if input box exists and is editable', () => {
		let categoryCount = 0;
		const className = '.subCategoriesSection';
		cy.get( className ).should( 'be.visible' );
		cy.get( '.nfd-setup-primary-custom__tellus-input' )
			.scrollIntoView()
			.should( 'be.visible' )
			.type( 'Cars' );
		const arr = cy.get( className.concat( ' div' ) );
		arr.each( () => {
			cy.get( className.concat( ' div' ) )
				.eq( categoryCount )
				.should( 'not.have.class', 'chosenSecondaryCategory' );
			categoryCount += 1;
		} );
	} );

	it( 'Check selecting subCategory resets input box', () => {
		cy.get( '.subCategoriesSection span' ).first().click();
		cy.get( '.subCategoriesSection' )
			.children()
			.should( 'have.class', 'chosenSecondaryCategory' );
		cy.get( '.nfd-setup-primary-custom__tellus-input' )
			.scrollIntoView()
			.should( 'be.visible' )
			.should( 'be.empty' );
	} );

	it( 'Check existence of Need Help Tag', () => {
		cy.get( '.nfd-card-need-help-tag' )
			.scrollIntoView()
			.should( 'be.visible' );
	} );

	it( 'Check existence of Need Help URL', () => {
		cy.get( '.nfd-card-need-help-tag > a' ).should( 'have.attr', 'href' );
	} );

	it( 'Go to the next step on clicking navigation Next', () => {
		cy.get( '.navigation-buttons_next' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-secondary'
		);
		cy.go( 'back' );
	} );

	it( 'Go to the previous step on clicking navigation Back', () => {
		cy.get( '.navigation-buttons_back' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-secondary'
		);
		cy.go( 'back' );
	} );

	it( 'Go to next step on Continue Setup', () => {
		cy.get( '.nfd-nav-card-button' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-secondary'
		);
		cy.go( 'back' );
	} );
} );

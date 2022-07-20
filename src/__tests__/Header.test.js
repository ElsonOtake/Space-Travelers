import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Tests for the Header component', () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  test('Checks for the following tests on screen', () => {

    expect(screen.getByText(/Space Travelers/)).toBeTruthy();
    expect(screen.getByText(/Hub/)).toBeTruthy();
    expect(screen.getByText("Space Travelers' Hub")).toBeTruthy();
    expect(screen.getByText('Rockets')).toBeTruthy();
    expect(screen.getByText('Missions')).toBeTruthy();
    expect(screen.getByText('My Profile')).toBeTruthy();

  });
  test('Checks for the Snapshot', () => {
    expect(screen.debug()).toMatchSnapshot();
  });
});
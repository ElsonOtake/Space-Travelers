import {
  beforeEach, describe, expect, test,
} from 'vitest';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Tests for the Header component', () => {
  beforeEach(() => render(
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
    </Router>,
  ));
  test('Checks for the following tests on screen', () => {
    expect(screen.getByText(/Space Travelers/)).toBeTruthy();
    expect(screen.getByText(/Hub/)).toBeTruthy();
    expect(screen.getByText("Space Travelers' Hub")).toBeTruthy();
    expect(screen.getByText('Rockets')).toBeTruthy();
    expect(screen.getByText('Launches')).toBeTruthy();
    expect(screen.getByText('Crew')).toBeTruthy();
    expect(screen.getByText('My Profile')).toBeTruthy();

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();

    expect(screen.getAllByRole('link').length).toBe(4);

    expect(screen.getByAltText('planet logo')).toBeTruthy();
  });
});

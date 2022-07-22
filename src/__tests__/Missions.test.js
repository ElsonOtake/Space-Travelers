import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Missions from '../components/Missions';
import store from '../redux/configureStore';

describe('Tests for the Missions component', () => {
  render(
    <Provider store={store}>
      <Missions />
    </Provider>,
  );
  test('Check for the following test on screen', () => {
    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getByRole('table')).toHaveClass('table-striped');
    expect(screen.getByRole('table')).toHaveClass('table-bordered');
    expect(screen.getByRole('table')).toHaveClass('table-hover');
    expect(screen.getByRole('table')).not.toHaveClass('striped');
    expect(screen.getByRole('table')).not.toHaveClass('bordered');
    expect(screen.getByRole('table')).not.toHaveClass('hover');

    expect(screen.getAllByRole('columnheader').length).toBe(4);
  });
  test('Check for the snapshot', () => {
    expect(screen.debug()).toMatchSnapshot();
  });
});

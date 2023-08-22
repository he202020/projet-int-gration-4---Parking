import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen'; // Adjust the import path based on your project structure
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assuming you're using @react-native-async-storage/async-storage for AsyncStorage

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

describe('HomeScreen', () => {
  it('displays user name and header text', async () => {
    const userName = 'John Doe';

    // Mock AsyncStorage.getItem to return the user name
    AsyncStorage.getItem.mockResolvedValue(userName);

    const route = {
      params: {
        parkingName: 'Parking A',
        reservationDuration: '2 hours',
      },
    };

    const { getByText } = render(<HomeScreen route={route} />);

    // Wait for AsyncStorage to resolve and update the state
    await waitFor(() => getByText(`Bonjour, ${userName}!`));

    expect(getByText(`Bonjour, ${userName}!`)).toBeTruthy();
    expect(getByText("Click 'n' Park!")).toBeTruthy();
    expect(getByText('Vous avez réservé le parking : Parking A')).toBeTruthy();
    expect(getByText('Durée de réservation : 2 hours')).toBeTruthy();
  });

  it('displays only header text if parkingName and reservationDuration are not provided', async () => {
    const userName = 'Jane Doe';

    // Mock AsyncStorage.getItem to return the user name
    AsyncStorage.getItem.mockResolvedValue(userName);

    const { getByText, queryByText } = render(<HomeScreen route={{}} />);

    // Wait for AsyncStorage to resolve and update the state
    await waitFor(() => getByText(`Bonjour, ${userName}!`));

    expect(getByText(`Bonjour, ${userName}!`)).toBeTruthy();
    expect(getByText("Click 'n' Park!")).toBeTruthy();
    expect(queryByText(/Vous avez réservé le parking/)).toBeNull();
    expect(queryByText(/Durée de réservation/)).toBeNull();
  });
});

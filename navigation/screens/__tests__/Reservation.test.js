import React from 'react';
import { shallow } from 'enzyme';

import Reservation from '../Reservation'; // Importez correctement votre composant Reservation

describe('<ReservationForm>', () => {
  it('calls handleReservation when "Réserver" button is pressed', () => {
    const mockHandleReservation = jest.fn();
    const wrapper = shallow(<Reservation handleReservation={mockHandleReservation} />);
    
    // Recherchez le composant Button et simulez un appui
    wrapper.find(Button).simulate('press');
    
    // Vérifiez que la fonction handleReservation a été appelée
    expect(mockHandleReservation).toHaveBeenCalled();
  });

  // ... Autres tests pour les interactions et le rendu du composant ReservationForm
});

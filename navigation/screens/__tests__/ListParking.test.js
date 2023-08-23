const { searchName } = require("../ListParking");

describe('searchName', () => {
  const parkingData = [
    { name: 'Parking A' },
    { name: 'Parking B' },
    { name: 'Parking C' },
  ];

  it('filtre correctement les données de stationnement en fonction de l\'entrée', () => {
    const input = 'A';
    const result = searchName(input, parkingData);
    expect(result).toEqual([
      { name: 'Parking A' },
    ]);
  });

  it('filtre correctement sans tenir compte de la casse', () => {
    const input = 'b';
    const result = searchName(input, parkingData);
    expect(result).toEqual([
      { name: 'Parking B' },
    ]);
  });

  it('renvoie un tableau vide si aucune correspondance n\'est trouvée', () => {
    const input = 'D';
    const result = searchName(input, parkingData);
    expect(result).toEqual([]);
  });
});

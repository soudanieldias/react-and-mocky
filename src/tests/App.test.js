import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    //global.fetch = jest.fn().mockResolvedValue({json: jest.fn().mockResolvedValue(responseAPI)})
    global.fetch = async () =>  ({json: async() => responseAPI});
    render(<App/>);
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const cardEl = await screen.findByRole('heading', {name: /Rick Sanchez/i});
    expect(cardEl).toBeInTheDocument();

  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const buttonEl = screen.getByRole('button');
    const inputEl = screen.getByPlaceholderText(/Rick Sanches/i);
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const buttonEl = screen.getByRole('button');
    const inputEl = screen.getByPlaceholderText(/Rick Sanches/i);

    userEvent.type(inputEl, 'Smith');
    userEvent.click(buttonEl);

    const cards = screen.getAllByRole('heading', {name: /Smith/i});
    expect(cards.length).toBe(4);
  })

})

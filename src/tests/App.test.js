import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import responseAPI from './mocks'

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    global.fetch = async () => ({json: async () => responseAPI})

    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const titulo = await screen.findByRole('heading', {name: /Rick Sanchez/i})
    expect(titulo).toBeInTheDocument()
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const buscar = screen.getByRole('button')
    const texto = screen.getByRole('textbox')
    expect(texto).toBeInTheDocument()
    expect(buscar).toBeInTheDocument()
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const buscar = screen.getByRole('button')
    const texto = screen.getByRole('textbox')
    userEvent.type(texto, 'smith')
    userEvent.click(buscar)

    const cards = 4;
    const cardsF = screen.getAllByRole('article')

    expect(cardsF).toHaveLength(cards)
  })

})

import axios from 'axios';

// Определение интерфейсов
interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status: 'available' | 'pending' | 'sold';
}

// Функция для выполнения GET-запроса
const getPetsByStatus = async (status: 'available' | 'pending' | 'sold'): Promise<Pet[]> => {
  try {
    const response = await axios.get<Pet[]>(
      `https://petstore3.swagger.io/api/v3/pet/findByStatus`,
      {
        params: { status },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message: ', error.message);
    } else {
      console.error('Unexpected error: ', error);
    }
    return [];
  }
};

// Основная функция
const main = async () => {
  const status: 'available' | 'pending' | 'sold' = 'available';
  const pets = await getPetsByStatus(status);
  console.log(pets);
};

// Запуск основной функции
main();

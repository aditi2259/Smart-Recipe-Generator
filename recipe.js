import React, { useState, useEffect, useCallback } from 'react';

// --- MOCK RECIPE DATABASE ---
// In a real application, this would come from a backend API.
const allRecipes = [
  {
    id: 1,
    name: 'Classic Tomato Bruschetta',
    ingredients: ['tomatoes', 'basil', 'garlic', 'onion', 'olive oil', 'baguette'],
    instructions: [
      'Dice tomatoes, finely chop basil and garlic.',
      'Mix tomatoes, basil, garlic, and a splash of olive oil in a bowl.',
      'Toast slices of baguette until golden brown.',
      'Top toasted baguette with the tomato mixture.',
    ],
    cookingTime: 15, // in minutes
    difficulty: 'Easy',
    nutritionalInfo: { calories: '150 kcal', protein: '3g' },
    dietary: ['vegetarian', 'vegan'],
    image: 'https://images.unsplash.com/photo-1505253716362-afb54c571651?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Vegetarian Chili',
    ingredients: ['onion', 'bell pepper', 'garlic', 'tomatoes', 'kidney beans', 'black beans', 'chili powder'],
    instructions: [
      'Sauté chopped onion, bell pepper, and garlic in a large pot.',
      'Add canned tomatoes, kidney beans, black beans, and chili powder.',
      'Simmer for at least 30 minutes, stirring occasionally.',
      'Serve hot with your favorite toppings.',
    ],
    cookingTime: 45,
    difficulty: 'Medium',
    nutritionalInfo: { calories: '350 kcal', protein: '15g' },
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1608219958963-9b4245653a47?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Gluten-Free Pancakes',
    ingredients: ['gluten-free flour', 'egg', 'milk', 'sugar', 'baking powder'],
    instructions: [
      'Whisk together gluten-free flour, sugar, and baking powder.',
      'In a separate bowl, whisk egg and milk.',
      'Combine wet and dry ingredients until just mixed.',
      'Cook on a hot griddle until bubbles form, then flip and cook through.',
    ],
    cookingTime: 20,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '250 kcal', protein: '8g' },
    dietary: ['vegetarian', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Chicken Alfredo Pasta',
    ingredients: ['chicken breast', 'fettuccine pasta', 'heavy cream', 'parmesan cheese', 'garlic', 'butter'],
    instructions: [
        'Cook pasta according to package directions.',
        'Season and cook chicken breast, then slice it.',
        'In a saucepan, melt butter, sauté garlic, then stir in heavy cream and parmesan until smooth.',
        'Combine sauce with pasta and top with sliced chicken.'
    ],
    cookingTime: 30,
    difficulty: 'Medium',
    nutritionalInfo: { calories: '600 kcal', protein: '40g' },
    dietary: [],
    image: 'https://images.unsplash.com/photo-1671120002422-68452119a089?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Simple Lemon Herb Baked Fish',
    ingredients: ['fish fillet', 'lemon', 'dill', 'parsley', 'olive oil', 'garlic'],
    instructions: [
        'Preheat oven to 400°F (200°C).',
        'Place fish fillet on a baking sheet.',
        'Drizzle with olive oil, minced garlic, chopped dill, and parsley.',
        'Top with lemon slices. Bake for 12-15 minutes or until fish flakes easily.',
    ],
    cookingTime: 20,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '300 kcal', protein: '35g' },
    dietary: ['gluten-free'],
    image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Caprese Salad',
    ingredients: ['tomatoes', 'mozzarella cheese', 'basil', 'balsamic glaze', 'olive oil'],
    instructions: [
        'Slice tomatoes and mozzarella cheese.',
        'Arrange alternating slices of tomato, mozzarella, and fresh basil leaves on a plate.',
        'Drizzle with olive oil and balsamic glaze before serving.'
    ],
    cookingTime: 10,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '250 kcal', protein: '10g' },
    dietary: ['vegetarian', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1529940129032-a8b275b2447b?q=80&w=1949&auto=format&fit=crop',
  },
  {
      id: 7,
      name: 'Beef and Broccoli Stir-fry',
      ingredients: ['beef sirloin', 'broccoli', 'soy sauce', 'garlic', 'ginger', 'rice'],
      instructions: [
          'Slice beef and marinate in soy sauce, garlic, and ginger.',
          'Cook rice according to package directions.',
          'Stir-fry beef in a hot wok or skillet until browned. Remove from skillet.',
          'Stir-fry broccoli florets until tender-crisp. Return beef to the skillet and heat through.',
          'Serve over rice.'
      ],
      cookingTime: 25,
      difficulty: 'Medium',
      nutritionalInfo: { calories: '450 kcal', protein: '30g' },
      dietary: [],
      image: 'https://images.unsplash.com/photo-1617834932652-33315a6b7b77?q=80&w=1974&auto=format&fit=crop'
  },
  {
      id: 8,
      name: 'Classic Guacamole',
      ingredients: ['avocado', 'lime', 'onion', 'cilantro', 'tomatoes', 'jalapeno'],
      instructions: [
          'Mash ripe avocados in a bowl.',
          'Stir in lime juice and salt.',
          'Mix in chopped onion, cilantro, tomatoes, and jalapeno.',
          'Serve immediately with tortilla chips.'
      ],
      cookingTime: 10,
      difficulty: 'Easy',
      nutritionalInfo: { calories: '150 kcal', protein: '2g' },
      dietary: ['vegetarian', 'vegan', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1554807038-b64491b45b23?q=80&w=1974&auto=format&fit=crop'
  },
  {
      id: 9,
      name: 'Mushroom Risotto',
      ingredients: ['arborio rice', 'mushrooms', 'onion', 'vegetable broth', 'parmesan cheese', 'white wine'],
      instructions: [
          'Sauté chopped onion and mushrooms in a pot.',
          'Add arborio rice and toast for a minute. Deglaze with white wine.',
          'Gradually add warm vegetable broth, one ladle at a time, stirring until absorbed.',
          'Once rice is creamy and cooked, stir in parmesan cheese.'
      ],
      cookingTime: 40,
      difficulty: 'Hard',
      nutritionalInfo: { calories: '400 kcal', protein: '12g' },
      dietary: ['vegetarian'],
      image: 'https://images.unsplash.com/photo-1621188942224-fb6a80436572?q=80&w=1974&auto=format&fit=crop'
  },
  {
      id: 10,
      name: 'Shepherd\'s Pie',
      ingredients: ['ground lamb', 'potato', 'onion', 'carrots', 'peas', 'beef broth', 'butter', 'milk'],
      instructions: [
          'Cook ground lamb with chopped onion and carrots. Add peas and beef broth, simmer until thick.',
          'Boil, mash, and mix potatoes with butter and milk.',
          'Spread the meat mixture in a baking dish and top with mashed potatoes.',
          'Bake at 375°F (190°C) for 20-25 minutes until golden brown.'
      ],
      cookingTime: 60,
      difficulty: 'Hard',
      nutritionalInfo: { calories: '550 kcal', protein: '25g' },
      dietary: [],
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b70a6?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 11,
    name: 'Spaghetti Aglio e Olio',
    ingredients: ['spaghetti', 'garlic', 'olive oil', 'red pepper flakes', 'parsley'],
    instructions: [
      'Cook spaghetti according to package directions.',
      'While pasta cooks, thinly slice garlic.',
      'Gently heat olive oil in a large skillet and cook garlic and red pepper flakes until fragrant.',
      'Drain pasta, add to the skillet, and toss to combine. Garnish with fresh parsley.'
    ],
    cookingTime: 15,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '400 kcal', protein: '10g' },
    dietary: ['vegetarian', 'vegan'],
    image: 'https://images.unsplash.com/photo-1627042630315-1a2a5b85e236?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 12,
    name: 'Quinoa Salad with Black Beans',
    ingredients: ['quinoa', 'black beans', 'corn', 'bell pepper', 'red onion', 'lime', 'cilantro'],
    instructions: [
      'Cook quinoa and let it cool.',
      'In a large bowl, combine cooked quinoa, black beans, corn, diced bell pepper, and chopped red onion.',
      'Whisk together lime juice, olive oil, and cilantro for the dressing.',
      'Pour dressing over the salad and toss to combine.'
    ],
    cookingTime: 25,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '350 kcal', protein: '14g' },
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1551248429-40974011e74f?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 13,
    name: 'Classic French Toast',
    ingredients: ['bread', 'egg', 'milk', 'cinnamon', 'butter'],
    instructions: [
      'Whisk together eggs, milk, and cinnamon in a shallow dish.',
      'Dip each slice of bread into the egg mixture, soaking both sides.',
      'Melt butter in a skillet over medium heat and cook bread until golden brown on both sides.',
      'Serve with syrup, fruit, or powdered sugar.'
    ],
    cookingTime: 15,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '300 kcal', protein: '12g' },
    dietary: ['vegetarian'],
    image: 'https://images.unsplash.com/photo-1639108097935-349f05a8b79b?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 14,
    name: 'Lentil Soup',
    ingredients: ['lentils', 'carrots', 'celery', 'onion', 'vegetable broth', 'tomatoes', 'garlic'],
    instructions: [
      'Sauté chopped onion, carrots, celery, and garlic in a large pot.',
      'Add lentils, vegetable broth, and diced tomatoes.',
      'Bring to a boil, then reduce heat and simmer for 25-30 minutes until lentils are tender.',
      'Season with salt and pepper to taste.'
    ],
    cookingTime: 40,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '250 kcal', protein: '18g' },
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1623101180518-e7b5791729b4?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 15,
    name: 'Garlic Shrimp Scampi',
    ingredients: ['shrimp', 'linguine', 'garlic', 'butter', 'white wine', 'lemon', 'parsley'],
    instructions: [
      'Cook linguine according to package directions.',
      'In a skillet, melt butter and sauté minced garlic until fragrant.',
      'Add shrimp and cook until pink. Deglaze the pan with white wine and lemon juice.',
      'Toss the cooked pasta in the skillet with the shrimp and sauce. Garnish with parsley.'
    ],
    cookingTime: 20,
    difficulty: 'Medium',
    nutritionalInfo: { calories: '500 kcal', protein: '25g' },
    dietary: [],
    image: 'https://images.unsplash.com/photo-1625944026243-d25aad0a5b82?q=80&w=1966&auto=format&fit=crop'
  },
  {
    id: 16,
    name: 'Omelette',
    ingredients: ['egg', 'milk', 'cheese', 'bell pepper', 'onion', 'butter'],
    instructions: [
      'Whisk eggs and milk together. Season with salt and pepper.',
      'Sauté chopped bell pepper and onion in a non-stick skillet with butter.',
      'Pour the egg mixture over the vegetables.',
      'As the eggs set, sprinkle cheese on one half and fold the other half over.'
    ],
    cookingTime: 10,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '300 kcal', protein: '20g' },
    dietary: ['vegetarian', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1521513919009-be90a48d1c4c?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 17,
    name: 'Chicken Noodle Soup',
    ingredients: ['chicken breast', 'egg noodles', 'carrots', 'celery', 'onion', 'chicken broth'],
    instructions: [
      'Boil chicken breast until cooked through, then shred it.',
      'In a large pot, sauté chopped carrots, celery, and onion.',
      'Add chicken broth, shredded chicken, and bring to a simmer.',
      'Add egg noodles and cook until tender.'
    ],
    cookingTime: 45,
    difficulty: 'Medium',
    nutritionalInfo: { calories: '350 kcal', protein: '30g' },
    dietary: [],
    image: 'https://images.unsplash.com/photo-1626372436154-47c3e5365942?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 18,
    name: 'Roasted Brussels Sprouts',
    ingredients: ['brussels sprouts', 'olive oil', 'balsamic glaze', 'garlic powder'],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Trim and halve the Brussels sprouts.',
      'Toss sprouts with olive oil, salt, pepper, and garlic powder on a baking sheet.',
      'Roast for 20-25 minutes, until tender and caramelized. Drizzle with balsamic glaze before serving.'
    ],
    cookingTime: 30,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '150 kcal', protein: '5g' },
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1543599525-1465225131a4?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 19,
    name: 'Mango Lassi',
    ingredients: ['mango', 'yogurt', 'milk', 'sugar', 'cardamom'],
    instructions: [
      'Combine ripe mango chunks, yogurt, milk, and sugar in a blender.',
      'Add a pinch of cardamom for flavor.',
      'Blend until smooth and creamy.',
      'Serve chilled.'
    ],
    cookingTime: 5,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '250 kcal', protein: '8g' },
    dietary: ['vegetarian', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1567171466263-6334591122a3?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 20,
    name: 'Avocado Toast',
    ingredients: ['bread', 'avocado', 'red pepper flakes', 'lemon'],
    instructions: [
      'Toast slices of your favorite bread.',
      'Mash avocado and spread it on the toast.',
      'Sprinkle with red pepper flakes, a squeeze of lemon juice, and salt to taste.'
    ],
    cookingTime: 5,
    difficulty: 'Easy',
    nutritionalInfo: { calories: '200 kcal', protein: '6g' },
    dietary: ['vegetarian', 'vegan'],
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1910&auto=format&fit=crop'
  }
];


// --- UI COMPONENTS ---

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500"></div>
  </div>
);

const RecipeCard = ({ recipe, onSelect }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => onSelect(recipe)}>
        <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" onError={(e) => e.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Error'} />
        <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800">{recipe.name}</h3>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>{recipe.cookingTime} min</span>
                <span>{recipe.difficulty}</span>
            </div>
            <div className="mt-2">
                <span className="text-sm font-semibold">Match: </span>
                <span className="text-sm font-bold text-teal-600">{Math.round(recipe.matchScore * 100)}%</span>
            </div>
        </div>
    </div>
);

const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                </div>
                <div className="p-6">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover rounded-md mb-4" onError={(e) => e.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Error'} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-center">
                        <div className="bg-teal-50 p-2 rounded-md"><strong>Time:</strong> {recipe.cookingTime} min</div>
                        <div className="bg-orange-50 p-2 rounded-md"><strong>Difficulty:</strong> {recipe.difficulty}</div>
                        <div className="bg-indigo-50 p-2 rounded-md"><strong>Calories:</strong> {recipe.nutritionalInfo.calories}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 border-b pb-1">Ingredients</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {recipe.ingredients.map((ing, i) => <li key={i}>{ing.charAt(0).toUpperCase() + ing.slice(1)}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 border-b pb-1">Instructions</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [detectedIngredients, setDetectedIngredients] = useState([]);
    
    const [suggestedRecipes, setSuggestedRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    
    // Filters
    const [dietaryFilter, setDietaryFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState(120);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [mimeType, setMimeType] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setMimeType(file.type);
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                setImageBase64(base64String);
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const recognizeIngredients = useCallback(async () => {
        if (!imageBase64) {
            setError('Please upload an image first.');
            return;
        }

        setIsLoading(true);
        setError('');
        setDetectedIngredients([]);
        
        try {
            const apiKey = ""; // The API key is handled by the environment.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const prompt = "Analyze the provided image and identify all visible food ingredients. Please return a single, comma-separated string of these ingredients in lowercase. For example: 'tomatoes, onion, garlic, basil'.";

            const payload = {
              contents: [
                {
                  parts: [
                    { text: prompt },
                    {
                      inlineData: {
                        mimeType: mimeType,
                        data: imageBase64
                      }
                    }
                  ]
                }
              ]
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error.message || `API Error: ${response.statusText}`);
            }
            
            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
              const ingredients = text.split(',').map(item => item.trim().toLowerCase());
              setDetectedIngredients(ingredients);
            } else {
              throw new Error("Could not parse ingredients from the response. The model might not have identified any.");
            }
        } catch (err) {
            setError(`Failed to recognize ingredients. ${err.message}. Check the console for details.`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [imageBase64, mimeType]);

    useEffect(() => {
        if (detectedIngredients.length === 0) {
            setSuggestedRecipes([]);
            return;
        };

        const calculateMatchScore = (recipeIngredients, detected) => {
            const recipeSet = new Set(recipeIngredients.map(i => i.toLowerCase()));
            const detectedSet = new Set(detected);
            let matches = 0;
            for (const item of recipeSet) {
                if (detectedSet.has(item)) {
                    matches++;
                }
            }
            return matches / recipeSet.size;
        };

        const filtered = allRecipes
            .filter(recipe => dietaryFilter === 'all' || recipe.dietary.includes(dietaryFilter))
            .filter(recipe => difficultyFilter === 'all' || recipe.difficulty === difficultyFilter)
            .filter(recipe => recipe.cookingTime <= timeFilter);

        const scored = filtered.map(recipe => ({
            ...recipe,
            matchScore: calculateMatchScore(recipe.ingredients, detectedIngredients)
        }));
        
        const sorted = scored
            .filter(recipe => recipe.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);
        
        setSuggestedRecipes(sorted);

    }, [detectedIngredients, dietaryFilter, difficultyFilter, timeFilter]);
    
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        <span role="img" aria-label="chef">🧑‍🍳</span> Smart Recipe Generator
                    </h1>
                    <p className="text-center text-gray-500 mt-1">Snap a pic of your ingredients, get instant recipe ideas!</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Upload Ingredient Photo</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                        {image && <img src={image} alt="Ingredients" className="mt-4 rounded-lg max-h-64 w-auto mx-auto"/>}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Find Recipes!</h2>
                        <button
                            onClick={recognizeIngredients}
                            disabled={isLoading || !image}
                            className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
                        >
                            {isLoading ? 'Analyzing...' : 'Generate Recipes'}
                        </button>
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        {isLoading && <LoadingSpinner />}
                        {detectedIngredients.length > 0 && !isLoading && (
                            <div className="mt-4 border-t pt-4">
                                <h3 className="font-semibold text-gray-600">Detected Ingredients:</h3>
                                <p className="text-sm text-gray-800 break-words">{detectedIngredients.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Suggestions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dietary</label>
                            <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500">
                                <option value="all">All</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="gluten-free">Gluten-Free</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500">
                                <option value="all">All</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Cook Time: {timeFilter} min</label>
                             <input type="range" min="5" max="120" step="5" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                        </div>
                    </div>
                    
                    {detectedIngredients.length > 0 ? (
                        suggestedRecipes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {suggestedRecipes.map(recipe => (
                                    <RecipeCard key={recipe.id} recipe={recipe} onSelect={setSelectedRecipe}/>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No matching recipes found for the detected ingredients and selected filters.</p>
                            </div>
                        )
                    ) : (
                         <div className="text-center py-10">
                            <p className="text-gray-500">Your recipe suggestions will appear here after you generate them.</p>
                        </div>
                    )}
                </div>
            </main>
            <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        </div>
    );
}





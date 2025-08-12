import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";


export default function Form() {

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state)=>state.searchRecipes)
  const showNotification = useAppStore((state)=>state.showNotification)

  useEffect(() => {
    fetchCategories();
  }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
      setSearchFilters({
        ...searchFilters,
        [e.target.name] : e.target.value
      })
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault()

      if(Object.values(searchFilters).includes('')){
        showNotification({
          text:'Todos los campos son obligatorios',
          error: true
        })
        return
      }
      searchRecipes(searchFilters)
    }

  return (
    <>
      {isHome && (
        <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <label
              htmlFor="ingredient"
              className="block text-white uppercase font-extrabold text-lg"
            >
              Ingrediente:
            </label>
            <input
              name="ingredient"
              type="text"
              id="ingredient"
              className=" p-3 w-full rounded-lg focus:outline-none text-black bg-white"
              placeholder="Nombre o Ingrediente Ej. Vodka, Tequila, Café"
              onChange={handleChange}
              value={searchFilters.ingredient}
            />
          </div>

          <div className="space-y-4">
            <label
              htmlFor="category"
              className="block text-white uppercase font-extrabold text-lg"
            >
              Categoria:
            </label>
            <select
              name="category"
              id="category"
              className=" p-3 w-full rounded-lg focus:outline-none  text-black bg-white"
              onChange={handleChange}
              value={searchFilters.category}
            >
              <option value="">-- Seleccione --</option>
              {categories.drinks.map((category) => (
                <option value={category.strCategory} key={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </select>
          </div>
          <input
            type="submit"
            value="Buscar Recetas"
            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full h-12 rounded-lg uppercase"
          />
        </form>
      )}
    </>
  );
}

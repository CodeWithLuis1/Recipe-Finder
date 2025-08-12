import {create} from 'zustand';
import {createRecipeSlice,type RecipesSliceType} from './recipeSlice';
import {type FavoritesSliceType, createFavoritesSlice } from './favoritesSlice';
import {type NotificationSliceType, createNotificationSlice } from './notificationSlice';



export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>((...a)=>({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)

}))
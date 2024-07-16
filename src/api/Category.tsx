import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const CategoryAPI = {
  editCategory: async (
    categoryId: string,
    formData: FormData,
  ): Promise<void> => {
    await HttpUtil.put(`${ROUTE_API.editCategory}/${categoryId}`, formData);
  },

  deleteCategory: async (categoryId: string) => {
    const res = await HttpUtil.delete(
      `${ROUTE_API.deleteCategory.replace(':id', categoryId)}`,
    );
    return res.data;
  },
};

export default CategoryAPI;

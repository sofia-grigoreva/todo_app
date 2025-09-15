import { generateRandomColor } from '../../helpers/colorHelper.js';

export const todoTransformer = action => {
    const color = generateRandomColor();
    return {
      ...action,
      payload: {
        ...action.payload,
        color
      }
    };
};


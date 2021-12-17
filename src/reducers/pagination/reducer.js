import { ACTIONS } from "./actions";
const OFFSET = 40;

const paginationReducer = (state, action) => {
  let newIndex, newPageUrl;
  switch (action.type) {
    case ACTIONS.NEXT_PAGE:
      newIndex = state.startedIndex + OFFSET;
      newIndex = newIndex > action.totalItem ? action.totalItem : newIndex;
      newPageUrl = action.getAPI(newIndex);

      return {
        pageUrl: newPageUrl,
        startedIndex: newIndex,
        isNext: newIndex !== action.totalItem,
        isPrevious: true,
      };
    case ACTIONS.PREVIOUS_PAGE:
      newIndex = state.startedIndex - OFFSET;
      newIndex = newIndex < 0 ? 0 : newIndex;
      newPageUrl = action.getAPI(newIndex);

      return {
        pageUrl: newPageUrl,
        startedIndex: newIndex,
        isNext: true,
        isPrevious: newIndex !== 0,
      };
    default:
      return state;
  }
};

export default paginationReducer;

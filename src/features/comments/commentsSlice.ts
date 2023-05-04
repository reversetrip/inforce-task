import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment } from '../../app/types';

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: []
};

export const getCommentsList = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const response = await fetch('http://localhost:3001/comments');
    const comments = await response.json();
    return comments;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number | string>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsList.fulfilled, (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;

export const selectAllProductComments = (state: RootState, prodId: number | string) => {
  return state.comments.comments.filter(c => c.productId === prodId);
};

export default commentsSlice.reducer;

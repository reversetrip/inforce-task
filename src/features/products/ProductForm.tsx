import './styles/productForm.scss';

type FormProps = {
  params: {
    imageUrl: string;
    name: string;
    count: string;
    width: string;
    height: string;
    weight: string;
  };
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ProductForm({
  params: {
    imageUrl,
    name,
    count,
    width,
    height,
    weight
  },
  handler
}: FormProps) {

  return (
    <form>
      <label>
        Name:
        <input
          value={name}
          onChange={handler}
          name='name'
        />
      </label>
      <label>
        Image URL:
        <input
          value={imageUrl}
          onChange={handler}
          name='imageUrl'
          style={{ marginRight: '2rem'}}
        />
      </label>
      <label>
        Count:
        <input
          value={count}
          onChange={handler}
          name='count'
        />
      </label>
      <label>
        Width:
        <input
          value={width}
          onChange={handler}
          name='width'
        />
      </label>
      <label>
        Height:
        <input
          value={height}
          onChange={handler}
          name='height'
        />
      </label>
      <label>
        Weight:
        <input
          value={weight}
          onChange={handler}
          name='weight'
        />
      </label>
    </form>
  );
}
import './styles/header.scss';

export function Header() {
  return (
    <header>
      <p><a href='/'>LaptopsNet</a></p>
      <nav>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/'>About</a></li>
          <li><a href='/'>Contact us</a></li>
        </ul>
      </nav>
    </header>
  );
}

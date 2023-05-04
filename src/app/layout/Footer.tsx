import './styles/footer.scss';

export function Footer() {
  return (
    <footer>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/'>About</a></li>
        <li><a href='/'>Contact us</a></li>
      </ul>
      <p>LaptopsNet React application {new Date().getFullYear()} ©</p>
    </footer>
  );
}

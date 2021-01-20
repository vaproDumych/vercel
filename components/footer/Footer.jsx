export default function Footer({ copyright = '2020' }) {
  return (
    <footer className="footer-main text-center">
      <div
        className="row"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <span>
          ТзОВ "ТД "Електричні системи" 2021
        </span>
      </div>
    </footer>
  );
}

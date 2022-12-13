import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Monique B. Repair</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Daks City, Monique B. Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Monique Repairs<br />
                    963 Tru Drive<br />
                    Daks City, CAT 12345<br />
                    <a href="tel:+699123456789">(69) 912-3456789</a>
                </address>
                <br />
                <p>Owner: Monique Book</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
  )
}

export default Public

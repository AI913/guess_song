import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <Link href = "/"><a>答題目</a></Link>
            <Link href = "/add"><a>出題目</a></Link>
        </nav>
    )
}

export default Navbar;
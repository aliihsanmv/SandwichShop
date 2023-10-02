import MenuItem from "./components/menu-item";

export default function MenuPage() {
    return <main className="flex min-h-screen flex-col items-center justify-top p-24">
            <h1>Menu</h1>
            <section className="flex flex-row justify-center min-w-full flex-wrap">
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
            </section>
        </main>;
    
}
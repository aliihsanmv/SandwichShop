import MenuItem from "./components/menu-item";

export default function MenuPage() {
    return <main className="flex min-h-screen flex-col items-center justify-top p-24 bg-slate-300">
            <h1>Menu</h1>
            <section className="flex flex-row justify-center min-w-full flex-wrap gap-5">
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
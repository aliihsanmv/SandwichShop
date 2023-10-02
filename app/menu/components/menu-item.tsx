import Rating from "@/app/components/rating";

export default function MenuItem() {
    return <article className="w-[250px] border-2 m-2 border-gray-300 bg-white">
                <div>
                    <img className="h-56 object-cover w-full"  
                        src="https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Grilled-Cheese-and-Tomato-Sandwich-683x1024.webp"></img>
                </div>

                <div id="meun-item-buttons" className="flex flex-row justify-between">
                    <button className="b">Info</button>
                    <button>Ingredients</button>
                    <button>Add</button>
                </div>

                <div className="p-5">
                    <h2 className="mb-2">Cream Cheese Sandwitch</h2>
                    <div className="flex gap-2">
                        <Rating></Rating>
                        <span className="text-sm">200 Reviews</span>
                    </div>
                    <a href="#" className="text-sm font-bold">Chinese Chef</a>
                    <p>The sandwitch is a ..</p>
                </div>
            </article>;
}
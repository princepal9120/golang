import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Plus, Search, SlidersHorizontal, Tv, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GENRES = ["All", "Shounen", "Seinen", "Shoujo", "Slice of Life", "Romance", "Thriller", "Fantasy", "Sci-Fi", "Psychological", "Comedy", "Drama"];

const MOCK_ANIME = [
  { id: 1, title: "Attack on Titan", year: 2013, rating: 4.9, poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=450&fit=crop", genre: "Shounen", episodes: 87, studio: "MAPPA", status: "Completed" },
  { id: 2, title: "Demon Slayer", year: 2019, rating: 4.8, poster: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=300&h=450&fit=crop", genre: "Shounen", episodes: 44, studio: "ufotable", status: "Ongoing" },
  { id: 3, title: "Steins;Gate", year: 2011, rating: 4.9, poster: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=300&h=450&fit=crop", genre: "Sci-Fi", episodes: 24, studio: "White Fox", status: "Completed" },
  { id: 4, title: "Your Name", year: 2016, rating: 4.8, poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=300&h=450&fit=crop", genre: "Romance", episodes: 1, studio: "CoMix Wave", status: "Completed" },
  { id: 5, title: "One Punch Man", year: 2015, rating: 4.7, poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=450&fit=crop", genre: "Shounen", episodes: 24, studio: "Madhouse", status: "Ongoing" },
  { id: 6, title: "Death Note", year: 2006, rating: 4.9, poster: "https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=300&h=450&fit=crop", genre: "Psychological", episodes: 37, studio: "Madhouse", status: "Completed" },
  { id: 7, title: "Fullmetal Alchemist", year: 2009, rating: 4.9, poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&h=450&fit=crop", genre: "Shounen", episodes: 64, studio: "Bones", status: "Completed" },
  { id: 8, title: "My Hero Academia", year: 2016, rating: 4.7, poster: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=450&fit=crop", genre: "Shounen", episodes: 113, studio: "Bones", status: "Ongoing" },
  { id: 9, title: "Violet Evergarden", year: 2018, rating: 4.8, poster: "https://images.unsplash.com/photo-1613234151096-e3d06ad71b31?w=300&h=450&fit=crop", genre: "Drama", episodes: 13, studio: "Kyoto Animation", status: "Completed" },
  { id: 10, title: "Cowboy Bebop", year: 1998, rating: 4.8, poster: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=300&h=450&fit=crop", genre: "Sci-Fi", episodes: 26, studio: "Sunrise", status: "Completed" },
  { id: 11, title: "Spy x Family", year: 2022, rating: 4.7, poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=450&fit=crop", genre: "Comedy", episodes: 25, studio: "Wit Studio", status: "Ongoing" },
  { id: 12, title: "Code Geass", year: 2006, rating: 4.8, poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=450&fit=crop", genre: "Shounen", episodes: 50, studio: "Sunrise", status: "Completed" },
];

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAnime = MOCK_ANIME.filter((anime) => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || anime.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen sakura-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-neon rounded-xl flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform">
                  <Tv size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-gradient-neon">AniVerse</span>
              </Link>
              <div className="hidden md:flex gap-6 text-sm">
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/movies" className="text-foreground font-semibold border-b-2 border-primary pb-1">
                  Browse
                </Link>
                <Link to="/my-list" className="text-muted-foreground hover:text-foreground transition-colors">
                  My List
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-glow-primary cursor-pointer hover:scale-110 transition-transform">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-primary" size={40} />
            <h1 className="text-5xl font-bold">
              <span className="text-gradient-neon">Browse Anime</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Explore our collection of {MOCK_ANIME.length}+ amazing anime titles
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search anime titles..."
                leftIcon={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              leftIcon={<SlidersHorizontal size={18} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>

          {/* Genre Filters */}
          {showFilters && (
            <div className="animate-fade-in p-6 bg-card border-2 border-primary/30 rounded-2xl shadow-glow-primary">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-gradient-neon">Filter by Genre</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
                      selectedGenre === genre
                        ? "bg-gradient-primary text-primary-foreground shadow-glow-primary border-primary scale-105"
                        : "bg-background-secondary text-muted-foreground hover:bg-background-elevated hover:text-foreground border-border"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center gap-2">
          <p className="text-muted-foreground">
            Showing <span className="text-primary font-bold">{filteredAnime.length}</span> of <span className="text-primary font-bold">{MOCK_ANIME.length}</span> anime
            {selectedGenre !== "All" && <span> in <span className="text-secondary font-bold">{selectedGenre}</span></span>}
          </p>
        </div>

        {/* Anime Grid */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAnime.map((anime, index) => (
              <div
                key={anime.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 bg-background-secondary border-2 border-transparent hover:border-primary/50 transition-all">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="hero" size="sm" leftIcon={<Play size={16} />} className="shadow-glow-primary">
                      Watch
                    </Button>
                    <Button variant="secondary" size="sm" leftIcon={<Plus size={16} />}>
                      My List
                    </Button>
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 border border-primary/30">
                    <span className="text-primary text-sm font-bold">{anime.rating}</span>
                    <span className="text-primary text-xs">★</span>
                  </div>
                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold ${
                    anime.status === 'Ongoing' 
                      ? 'bg-success/20 text-success border border-success/50' 
                      : 'bg-muted/20 text-muted-foreground border border-muted/50'
                  }`}>
                    {anime.status}
                  </div>
                  {/* Episode Count */}
                  <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 border border-accent/30">
                    <Clock size={12} className="text-accent" />
                    <span className="text-xs font-medium">{anime.episodes} EP</span>
                  </div>
                </div>
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {anime.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {anime.year} • {anime.genre}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Studio: {anime.studio}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border-2 border-primary/20">
            <div className="w-24 h-24 bg-background-elevated rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No anime found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;

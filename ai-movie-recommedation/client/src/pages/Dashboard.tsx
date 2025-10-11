import { Link } from "react-router-dom";
import { Play, Plus, Tv, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_ANIME = [
  {
    id: 1,
    title: "Attack on Titan",
    year: 2013,
    rating: 4.9,
    episodes: 87,
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=450&fit=crop",
    genre: "Shounen",
    studio: "MAPPA",
    status: "Completed",
  },
  {
    id: 2,
    title: "Demon Slayer",
    year: 2019,
    rating: 4.8,
    episodes: 44,
    poster: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=300&h=450&fit=crop",
    genre: "Shounen",
    studio: "ufotable",
    status: "Ongoing",
  },
  {
    id: 3,
    title: "Steins;Gate",
    year: 2011,
    rating: 4.9,
    episodes: 24,
    poster: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=300&h=450&fit=crop",
    genre: "Sci-Fi",
    studio: "White Fox",
    status: "Completed",
  },
  {
    id: 4,
    title: "Your Name",
    year: 2016,
    rating: 4.8,
    episodes: 1,
    poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=300&h=450&fit=crop",
    genre: "Romance",
    studio: "CoMix Wave",
    status: "Completed",
  },
  {
    id: 5,
    title: "One Punch Man",
    year: 2015,
    rating: 4.7,
    episodes: 24,
    poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=450&fit=crop",
    genre: "Shounen",
    studio: "Madhouse",
    status: "Ongoing",
  },
];

const Dashboard = () => {
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
                <Link to="/dashboard" className="text-foreground font-semibold border-b-2 border-primary pb-1">
                  Home
                </Link>
                <Link to="/movies" className="text-muted-foreground hover:text-foreground transition-colors">
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

      {/* Hero Featured Anime */}
      <section className="relative h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=1920&h=1080&fit=crop"
            alt="Featured"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-destructive/20 rounded-full text-destructive text-sm font-bold border border-destructive/50 flex items-center gap-2">
                <TrendingUp size={16} />
                #1 Trending
              </div>
              <div className="px-3 py-1 bg-accent/20 rounded-full text-accent text-sm font-bold border border-accent/50">
                Shounen
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              Jujutsu Kaisen
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A boy swallows a cursed talisman and becomes possessed. He must learn sorcery to protect 
              those he loves and exorcise the demons within himself in this dark supernatural action series.
            </p>
            <div className="flex items-center gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">4.9</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-5 h-5 text-primary">★</div>
                  ))}
                </div>
              </div>
              <span className="text-muted-foreground">2020 • 24 Episodes • MAPPA</span>
              <div className="px-3 py-1 bg-success/20 rounded-full text-success text-sm font-bold border border-success/50">
                Ongoing
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="hero" size="lg" leftIcon={<Play size={20} />} className="shadow-glow-primary">
                Watch Now
              </Button>
              <Button variant="secondary" size="lg" leftIcon={<Plus size={20} />}>
                Add to List
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended For You */}
      <section className="py-16 container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-gradient-neon">Recommended For You</span>
          </h2>
          <p className="text-muted-foreground flex items-center gap-2">
            Based on your favorite genres: <span className="text-primary font-medium">Shounen</span>, 
            <span className="text-secondary font-medium">Sci-Fi</span>, 
            <span className="text-accent font-medium">Romance</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {MOCK_ANIME.map((anime) => (
            <div
              key={anime.id}
              className="group cursor-pointer animate-fade-in"
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
      </section>

      {/* Continue Watching */}
      <section className="py-16 container mx-auto px-6 bg-background-secondary/50 rounded-3xl">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Clock className="text-accent" size={32} />
          Continue Watching
        </h2>
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-background-elevated rounded-full flex items-center justify-center mx-auto mb-4">
            <Play size={40} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg mb-4">
            Nothing here yet. Start your anime journey!
          </p>
          <Link to="/movies">
            <Button variant="secondary">
              Browse Anime
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

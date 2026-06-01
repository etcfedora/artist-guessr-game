const RAPPERS = [
  {
    id: 1,
    name: "Kendrick Lamar",
    album: "good kid, m.A.A.d city",
    year: 2012,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/2/23/Good_Kid%2C_M.A.A.d_City.jpg",
    origin: { lat: 33.8958, lng: -118.2201, label: "Compton, California, USA" }
  },
  {
    id: 2,
    name: "Drake",
    album: "Take Care",
    year: 2011,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b8/Take_Care_Drake.jpg",
    origin: { lat: 43.6532, lng: -79.3832, label: "Toronto, Canada" }
  },
  {
    id: 3,
    name: "Stormzy",
    album: "Gang Signs & Prayer",
    year: 2017,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a6/Stormzy_-_Gang_Signs_%26_Prayer.png",
    origin: { lat: 51.4816, lng: -0.0957, label: "Croydon, London, UK" }
  },
  {
    id: 4,
    name: "Skepta",
    album: "Konnichiwa",
    year: 2016,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/5e/Skepta_-_Konnichiwa.png",
    origin: { lat: 51.5942, lng: -0.0558, label: "Tottenham, London, UK" }
  },
  {
    id: 5,
    name: "Eminem",
    album: "The Marshall Mathers LP",
    year: 2000,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg",
    origin: { lat: 42.3314, lng: -83.0458, label: "Detroit, Michigan, USA" }
  },
  {
    id: 6,
    name: "Jay-Z",
    album: "The Blueprint",
    year: 2001,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/31/The_Blueprint.jpg",
    origin: { lat: 40.6501, lng: -73.9496, label: "Brooklyn, New York, USA" }
  },
  {
    id: 7,
    name: "Nas",
    album: "Illmatic",
    year: 1994,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/NasIllmatic.jpg",
    origin: { lat: 40.7282, lng: -73.7949, label: "Queensbridge, New York, USA" }
  },
  {
    id: 8,
    name: "MF DOOM",
    album: "Madvillainy",
    year: 2004,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/8/8f/Madvillainy.jpg",
    origin: { lat: 51.5074, lng: -0.1278, label: "London, UK" }
  },
  {
    id: 9,
    name: "Kanye West",
    album: "The College Dropout",
    year: 2004,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
    origin: { lat: 41.8781, lng: -87.6298, label: "Chicago, Illinois, USA" }
  },
  {
    id: 10,
    name: "J. Cole",
    album: "2014 Forest Hills Drive",
    year: 2014,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3d/2014ForestHillsDrive.jpg",
    origin: { lat: 35.0527, lng: -78.8784, label: "Fayetteville, North Carolina, USA" }
  },
  {
    id: 11,
    name: "OsamaSon",
    album: "psykotic",
    year: 2025,
    coverUrl: "https://media.pitchfork.com/photos/68e7d2e748e693cdd984408f/2:3/w_1050,h_1575,c_limit/OsamaSon:%20Psykotic.png",
    origin: { lat: 32.9982970435203, lng: -80.0395466999876, label: "Goosecreek, South Carolina, USA" }
  },
  {
    id: 12,
    name: "Edward Skeletrix",
    album: "Museum Music",
    year: 2025,
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273baec8cf328e00f44899170e7",
    origin: { lat: 30.33218, lng: -81.65565, label: "Jacksonville, Florida, USA" }
  },
  {
    id: 13,
    name: "Forza",
    album: "Danger",
    year: "2024",
    coverUrl: "https://source.boomplaymusic.com/group10/M00/02/10/e474ee2f00d64843b590a114242d7211H3000W3000_464_464.jpg",
    origin: { lat: 40.7066, lng: 74.5493, label: "Basking Ridge, New Jersey, USA" }
  },
  {
    id: 14,
    name: "Playboi Carti",
    album: "Whole Lotta Red",
    year: 2020,
    coverUrl: "https://pitchfork.com/reviews/albums/playboi-carti-whole-lotta-red/",
    origin: { lat: 33.749, lng: -84.388, label: "Atlanta, Georgia, USA" }
  },
  {
    id: 15,
    name: "Ken Carson",
    album: "A Great Chaos",
    year: 2023,
    coverUrl: "https://en.wikipedia.org/wiki/A_Great_Chaos",
    origin: { lat: 33.749, lng: -84.388, label: "Atlanta, Georgia, USA" }
  },
 {
  id: 16,
    name: "Destroy Lonely",
    album: "If Looks Could Kill",
    year: 2023,
    coverUrl: "https://en.wikipedia.org/wiki/If_Looks_Could_Kill_%28Destroy_Lonely_album%29",
    origin: { lat: 33.749, lng: -84.388, label: "Atlanta, Georgia, USA" }
 },
 {
  id: 17,
  name: "wave to earth",
  album: "0.1 Flaws and All",
  year: 2023,
  coverUrl: "https://open.spotify.com/album/5T0Gt5JYXh6gEttuB8ujML",
  origin: { lat: 37.5665, lng: 126.978, label: "Seoul, South Korea" }
},
{
  id: 18,
  name: "Mitski",
  album: "Puberty 2",
  year: 2016,
  coverUrl: "https://en.wikipedia.org/wiki/Puberty_2",
  origin: { lat: 35.6762, lng: 139.6503, label: "Tokyo, Japan (raised USA)" }
},
{
  id: 19,
  name: "Mac DeMarco",
  album: "Salad Days",
  year: 2014,
  coverUrl: "https://macdemarco.bandcamp.com/album/salad-days",
  origin: { lat: 53.5461, lng: -113.4938, label: "Edmonton, Canada" }
},
{
  id: 20,
  name: "Clairo",
  album: "Sling",
  year: 2021,
  coverUrl: "https://en.wikipedia.org/wiki/Sling_%28album%29",
  origin: { lat: 42.3601, lng: -71.0589, label: "Boston, Massachusetts, USA" }
},
];

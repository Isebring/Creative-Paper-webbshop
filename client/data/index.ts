export interface Product {
  id: string;
  image: string;
  secondImage: string;
  title: string;
  description: string;
  summary: string[];
  price: number;
  rating: number;
  usersRated: number;
  category: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: '1',
    image:
      'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F90348%252F36%252Fwildflower-22590_front_1680777957.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3Dfbf27af9c76f530fb146420170981a0e?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f6d74b85151d69884edd50ba879631eb',
    title: 'Wildflower',
    description:
      'The possibilities of a new notebook are endless. Whether it becomes a space for grand ideas, little reminders or anything that inspires you throughout the day. Decide if you’d like lined, dotted or plain pages inside and then personalize your cover with a name, fun title, your alter ego or a special quote – the page is yours.',
    summary: [
      '6" x 8.5"',
      '96 leaves (192 sides) of lined paper.',
      'Line height: 0.3"',
    ],
    price: 30.0,
    rating: 4.5,
    usersRated: 7,
    secondImage:
      'https://papier.imgix.net/https%3A%2F%2Fd1o785do8fyxgx.cloudfront.net%2Fproduct%2Fproduct_images%2Fimages%2F000%2F002%2F501%2Foriginal%2F1022_PMTEST_Wildflower_Generic_Resized.jpg%3F1665401173?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=8644b53c80f4bbf2f3287972643c3cf2',
    category: [''],
  },
  {
    id: '2',
    image:
      'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F145671%252F36%252Fflowerbed-39494_front_1680778168.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3Dbcda6dcee99198f2b65acaed09048b8f?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f6e3172e5e901a590fc1a4282904f7e7',
    title: 'Flowerbed',
    description:
      'The possibilities of a new notebook are endless. Whether it becomes a space for grand ideas, little reminders or anything that inspires you throughout the day. Decide if you’d like lined, dotted or plain pages inside and then personalize your cover with a name, fun title, your alter ego or a special quote – the page is yours.',
    summary: [
      '6" x 8.5"',
      '96 leaves (192 sides) of lined paper.',
      'Line height: 0.3"',
    ],
    price: 30.0,
    rating: 3.2,
    usersRated: 5,
    secondImage:
      'https://papier.imgix.net/https%3A%2F%2Fd1o785do8fyxgx.cloudfront.net%2Fproduct%2Fproduct_images%2Fimages%2F000%2F002%2F405%2Foriginal%2FFLOWERBED_RACINGGREEN_NOTEBOOK_0422_1.jpg%3F1660300078?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=97b04953ff2d1ba38a2470bf1addf16a',
    category: [''],
  },
  {
    id: '3',
    image:
      'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F148180%252F153%252Ftaste-buddies-40172_front_1677493479.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3D47f88595d8e5cb2ddaa0a292ae45ba3e?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=d6eb0e8c924b62e7eb860f5b9d8648ab',
    title: 'Taste Buddies',
    description:
      'Plot delightful dishes for every day with our personalized meal planners. Design your weekly menu and see all your breakfasts, lunches and dinners on one page. Each week, there’s also a tear-off list you can fill out and take to the grocery store. With over a year’s worth of pages, meal planning is your route to lovely recipes, simpler shopping trips and less food waste. Enjoy.',
    summary: [
      '9.5" x 7"',
      'Satisfyingly thick paper that looks as good as it feels (120 gsm)',
      '60 weekly pages with tear-off grocery lists (Monday-Sunday)',
    ],
    price: 15.0,
    rating: 3.8,
    usersRated: 3,
    secondImage:
      'https://papier.imgix.net/https%3A%2F%2Fd1o785do8fyxgx.cloudfront.net%2Fproduct_type_name_images%2Fimages%2F000%2F000%2F799%2Foriginal%2FMeal-Planner-Lifestyle-Shot-1-PNG24.png%3F1658229327?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f2af75991a7b407bb50993fa7fbf1386',
    category: [''],
  },
  {
    id: '4',
    image:
      'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F133899%252F153%252Fthe-jag-35909_front_1677493339.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3D07479510662f916630a95b0e824a9da9?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=9bafa2ffeb26fc4aaa2cc55a88e1b5a6',
    title: 'The Jag',
    description:
      'For those who like to plan, our desk planners are the new daily companions to have by your side. Structure your week with to-dos, goals, dinner ideas, exercise plans, reminders and more. They’re undated and come with easy tearaway pages. Did we mention they’re just the right size for being on the go?',
    summary: [
      '9.5" x 7"',
      'Satisfyingly thick paper that looks as good as it feels (120 gsm)',
      'Foldable cover to protect your planner on the go',
    ],
    price: 20.0,
    rating: 4.2,
    usersRated: 8,
    secondImage:
      'https://papier.imgix.net/https%3A%2F%2Fd1o785do8fyxgx.cloudfront.net%2Fproduct%2Fproduct_images%2Fimages%2F000%2F003%2F032%2Foriginal%2FJAG_DESKPLANNER_0123_1.jpg%3F1671550462?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=8034d3ab27f72d1f104fcd22fbbe3d07',
    category: [''],
  },
  {
    id: '5',
    image:
      'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F157871%252F169%252Fnose-in-a-book-43014_front_1682610655.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3D27e2b5c8b5d163eda6aff28322e7e7e7?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=e8f77c3631e42f7e6f686279914fa69f',
    title: 'Nose in a Book',
    description:
      'The journal for your reading journey. Find delight in new narratives and remember your most-loved books with our reading journal. Record and review your reads, with journaling prompts that double as book club questions. Choose your next book from your own reading wish list, or consult our curated list of Papier recommendations. Our reading journal is the perfect place to put literary love into words.',
    summary: [
      '6" x 8.5"',
      '96 leaves (192 sides) of lovely paper.',
      'Space to review 32 books, with 4 pages per review',
    ],
    price: 35.0,
    rating: 3.5,
    usersRated: 2,
    secondImage:
      'https://papier.imgix.net/https%3A%2F%2Fd1o785do8fyxgx.cloudfront.net%2Fproduct%2Fproduct_images%2Fimages%2F000%2F003%2F082%2Foriginal%2FNOSE_IN_BOOK_READING_JOURNAL_1.jpg%3F1675943202?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=1a275b48f47fd0912dcda9254cdc672f',
    category: [''],
  },
  {
    id: '6',
    image:
      'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F114391%252F36%252Fdutch-tulip-30276_front_1680778023.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3D215e9867ca41d6cb55f542f13989f5af?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=5c6fdd8ee8dcca234a7d0052e2f321be',
    title: 'Dutch Tulip',
    description:
      'Make time for yourself with our daily wellness journal. Start and end each day with a fresh mindset, set intentions and take note of the things that make you feel good. Inside, there are 12-weeks of pages for reflecting on your mindful goals, habits, meals, water intake, sleep and the things you’re grateful for.',
    summary: [
      '6" x 8.5"',
      '96 leaves (192 sides) of lovely paper.',
      'Its hardback cover is 3mm thick with a 150gsm silk paper finish',
    ],
    price: 35.0,
    rating: 4.9,
    usersRated: 4,
    secondImage:
      'https://papier.imgix.net/https%3A%2F%2Fd1o785do8fyxgx.cloudfront.net%2Fproduct_type_name_images%2Fimages%2F000%2F000%2F616%2Foriginal%2FWELLNESS_INSIDE_FILLED_0922_2.jpg%3F1667300139?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=daafd91868da4b00a3702387e1cafa6c',
    category: [''],
  },
];

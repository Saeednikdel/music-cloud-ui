import * as cover from './assets/cover';
import dido from './songs/dido.mp3';
import jenny from './songs/Jenny.mp3';
import johnny from './songs/johnny.mp3';
const data = [
  {
    title: 'ambition',
    singer: 'EP01',
    cover: cover.c1,
    url: dido,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'still on my mind',
    singer: 'dido',
    cover: cover.c2,
    url: jenny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'moon landing',
    singer: 'james blunt',
    cover: cover.c4,
    url: dido,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'Dirty Computer',
    singer: 'Janelle Monáe',
    cover: cover.c5,
    url: jenny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'born to die',
    singer: 'lana del rey',
    cover: cover.c6,
    url: johnny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'unrealised',
    singer: 'lana del rey',
    cover: cover.c7,
    url: dido,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'Hybrid Theory',
    singer: 'Linkin Park',
    cover: cover.c8,
    url: jenny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'stargroves',
    singer: 'little island',
    cover: cover.c9,
    url: johnny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'instrumental',
    singer: 'living sound',
    cover: cover.c10,
    url: dido,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'Minutes to Midnight',
    singer: 'linkin park',
    cover: cover.c11,
    url: jenny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'palms',
    singer: 'grande',
    cover: cover.c12,
    url: johnny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'other side',
    singer: 'pink floyd',
    cover: cover.c13,
    url: dido,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'pride',
    singer: 'belkacem',
    cover: cover.c14,
    url: jenny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'Road to',
    singer: 'runtown',
    cover: cover.c15,
    url: johnny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'rose',
    singer: 'mixtape',
    cover: cover.c16,
    url: dido,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'pain',
    singer: 'ryan jones',
    cover: cover.c17,
    url: jenny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'underrated',
    singer: 't classic',
    cover: cover.c18,
    url: johnny,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
  {
    title: 'bad',
    singer: 'michile jackson',
    cover: cover.c19,
    url: dido,
    lyrics:
      ' <br/> Hello, its me <br/> I was wondering if after all these years youd like to meet <br/> To go over everything <br/> They say that times supposed to heal ya, but I aint done much healing <br/> Hello, can you hear me? <br/> Im in California dreaming about who we used to be <br/> When we were younger and free <br/> Ive forgotten how it felt before the world fell at our feet <br/> Theres such a difference between us <br/> And a million miles <br/> Hello from the other side <br/> I mustve called a thousand times <br/> To tell you Im sorry for everything that Ive done <br/> But when I call, you never seem to be home <br/> Hello from the outside <br/> At least I can say that Ive tried <br/> To tell you Im sorry for breaking your heart <br/> But it dont matter, it clearly doesnt tear you apart anymore <br/> Hello, how are you? <br/> Its so typical of me to talk about myself, Im sorry',
  },
];
export default data;

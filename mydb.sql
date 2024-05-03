--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Homebrew)
-- Dumped by pg_dump version 14.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: natalianegron
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title text,
    author text,
    date date,
    description text,
    image text,
    borrowed boolean,
    reserved boolean,
    userreserved text
);


ALTER TABLE public.books OWNER TO natalianegron;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: natalianegron
--

ALTER TABLE public.books ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: natalianegron
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    checked integer[] DEFAULT '{}'::integer[],
    reserved integer[] DEFAULT '{}'::integer[]
);


ALTER TABLE public.users OWNER TO natalianegron;

--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: natalianegron
--

COPY public.books (id, title, author, date, description, image, borrowed, reserved, userreserved) FROM stdin;
19	The Bazaar Of Bad Dreams	Stephen King	2002-02-19	There are thrilling connections between stories; themes of morality, the afterlife, guilt, what we would do differently if we could see into the future or correct the mistakes of the past. In “Afterlife,” a man who died of colon cancer keeps reliving the same life, repeating his mistakes over and over again. Several stories feature characters at the end of life, revisiting their crimes and misdemeanors. Others address what happens when someone discovers that he has supernatural powers—the columnist who kills people by writing their obituaries in “Obits;” the old judge in “The Dune” who, as a boy, canoed to a deserted island and saw names written in the sand, people who then died in freak accidents. In “Morality,” King looks at how a marriage and two lives fall apart after the wife and husband enter into what seems, at first, a devil’s pact they can win.	http://res.cloudinary.com/do0w2gqax/image/upload/v1714769040/81fc9NgRyuL._SY522__hh2r6e.jpg	\N	\N	\N
18	Apothecary Diaries 01	Natsu Hyuuga 	2002-02-19	Maomao, a young woman trained in the art of herbal medicine, is forced to work as a lowly servant in the inner palace. Though she yearns for life outside its perfumed halls, she isn't long for a life of drudgery! Using her wits to break a "curse" afflicting the imperial heirs, Maomao attracts the attentions of the handsome eunuch Jinshi and is promoted to attendant food taster. But Jinshi has other plans for the erstwhile apothecary, and soon Maomao is back to brewing potions and...solving mysteries?!	http://res.cloudinary.com/do0w2gqax/image/upload/v1714768940/51Jus0uo4rL._SY445_SX342__ydu0ke.jpg	f	t	user_2fqA46XAktisCZNbg5rgD5bOVOm
12	Hobbit	Tolkien	1980-12-20	A little guy goes on an adventure	http://res.cloudinary.com/do0w2gqax/image/upload/v1714709883/hobbit_ud9ttk.jpg	f	\N	\N
13	Monday's not coming	 Tiffany D. Jackson	2018-05-22	Monday Charles is missing, and only Claudia seems to notice. Claudia and Monday have always been inseparable—more sisters than friends. So when Monday doesn’t turn up for the first day of school, Claudia’s worried.  When she doesn’t show for the second day, or second week, Claudia knows that something is wrong. Monday wouldn’t just leave her to endure tests and bullies alone. Not after last year’s rumors and not with her grades on the line. Now Claudia needs her best—and only—friend more than ever. But Monday’s mother refuses to give Claudia a straight answer, and Monday’s sister April is even less help.  As Claudia digs deeper into her friend’s disappearance, she discovers that no one seems to remember the last time they saw Monday. How can a teenage girl just vanish without anyone noticing that she’s gone?	http://res.cloudinary.com/do0w2gqax/image/upload/v1714768367/81fJ1hJO4FL._SY522__thpi9q.jpg	\N	\N	\N
15	Nana Volume 1	Ai Yazawa	2002-02-19	Nana "Hachi" Komatsu hopes that moving to Tokyo will help her make a clean start and leave her capricious love life behind her. Nana Osaki, who arrives in the city at the same time, has plans to score big in the world of rock'n'roll. Although these two young women come from different backgrounds, they quickly become best friends in a whirlwind world of sex, music, fashion, gossip and all-night parties!  Nana Komatsu is a young woman who's endured an unending string of boyfriend problems. Moving to Tokyo, she's hoping to take control of her life and put all those messy misadventures behind her. She's looking for love and she's hoping to find it in the big city.  Nana Osaki, on the other hand, is cool, confident and focused. She swaggers into town and proceeds to kick down the doors to Tokyo's underground punk scene. She's got a dream and won't give up until she becomes Japan's No. 1 rock'n'roll superstar.  This is the story of two 20-year-old women who share the same name. Even though they come from completely different backgrounds, they somehow meet and become best friends. The world of Nana is a world exploding with sex, music, fashion, gossip and all-night parties.	http://res.cloudinary.com/do0w2gqax/image/upload/v1714768698/91SzVsLIF4L._SY522__xhcxzj.jpg	\N	\N	\N
16	Im Thinking Of Ending Things	Iain Reid	2002-02-19	I’m thinking of ending things. Once this thought arrives, it stays. It sticks. It lingers. It’s always there. Always.  Jake once said, “Sometimes a thought is closer to truth, to reality, than an action. You can say anything, you can do anything, but you can’t fake a thought.”  And here’s what I’m thinking: I don’t want to be here.  In this smart and intense literary suspense novel, Iain Reid explores the depths of the human psyche, questioning consciousness, free will, the value of relationships, fear, and the limitations of solitude. Reminiscent of Jose Saramago’s early work, Michel Faber’s cult classic Under the Skin, and Lionel Shriver’s We Need to Talk about Kevin, “your dread and unease will mount with every passing page” (Entertainment Weekly) of this edgy, haunting debut. Tense, gripping, and atmospheric, I’m Thinking of Ending Things pulls you in from the very first page…and never lets you go.	http://res.cloudinary.com/do0w2gqax/image/upload/v1714768782/81F_1IHf3TL._SY522__nrsjhi.jpg	\N	\N	\N
17	My Dark Vanessa	Kate Elizabeth Russell	2002-02-19	2017. Amid the rising wave of allegations against powerful men, a reckoning is coming due. Strane has been accused of sexual abuse by a former student, who reaches out to Vanessa, and now Vanessa suddenly finds herself facing an impossible choice: remain silent, firm in the belief that her teenage self willingly engaged in this relationship, or redefine herself and the events of her past. But how can Vanessa reject her first love, the man who fundamentally transformed her and has been a persistent presence in her life? Is it possible that the man she loved as a teenager—and who professed to worship only her—may be far different from what she has always believed?  Alternating between Vanessa’s present and her past, My Dark Vanessa juxtaposes memory and trauma with the breathless excitement of a teenage girl discovering the power her own body can wield. Thought-provoking and impossible to put down, this is a masterful portrayal of troubled adolescence and its repercussions that raises vital questions about agency, consent, complicity, and victimhood. Written with the haunting intimacy of The Girls and the creeping intensity of Room, My Dark Vanessa is an era-defining novel that brilliantly captures and reflects the shifting cultural mores transforming our relationships and society itself.	http://res.cloudinary.com/do0w2gqax/image/upload/v1714768860/81UVZOCnY-L._SY522__ifuwhj.jpg	\N	\N	\N
21	The Promised Neverland, Vol. 1	 Kaiu Shirai	2002-02-19	Life at Grace Field House is good for Emma and her fellow orphans. While the daily studying and exams they have to take are tough, their loving caretaker provides them with delicious food and plenty of playtime. But perhaps not everything is as it seems…  Emma, Norman and Ray are the brightest kids at the Grace Field House orphanage. And under the care of the woman they refer to as “Mom,” all the kids have enjoyed a comfortable life. Good food, clean clothes and the perfect environment to learn—what more could an orphan ask for? One day, though, Emma and Norman uncover the dark truth of the outside world they are forbidden from seeing.	http://res.cloudinary.com/do0w2gqax/image/upload/v1714769155/61gJ4CMCtuL._SY445_SX342__jobcc1.jpg	\N	\N	\N
20	Demon Slayer: Kimetsu no Yaiba, Vol. 1	Koyoharu Gotouge 	2002-02-19	In Taisho-era Japan, kindhearted Tanjiro Kamado makes a living selling charcoal. But his peaceful life is shattered when a demon slaughters his entire family. His little sister Nezuko is the only survivor, but she has been transformed into a demon herself! Tanjiro sets out on a dangerous journey to find a way to return his sister to normal and destroy the demon who ruined his life.  Learning to destroy demons won’t be easy, and Tanjiro barely knows where to start. The surprise appearance of another boy named Giyu, who seems to know what’s going on, might provide some answers—but only if Tanjiro can stop Giyu from killing his sister first!	http://res.cloudinary.com/do0w2gqax/image/upload/v1714769098/81ZNkhqRvVL._SY522__iu3pjk.jpg	t	t	user_2fqA46XAktisCZNbg5rgD5bOVOm
14	Fairy Tale	Stephen King	2002-02-19	Charlie Reade looks like a regular high school kid, great at baseball and football, a decent student. But he carries a heavy load. His mom was killed in a horrific accident when he was seven, and grief drove his dad to drink. Charlie learned how to take care of himself—and his dad. When Charlie is seventeen, he meets a dog named Radar and her aging master, Howard Bowditch, a recluse in a big house at the top of a big hill, with a locked shed in the backyard. Sometimes strange sounds emerge from it.  Charlie starts doing jobs for Mr. Bowditch and loses his heart to Radar. Then, when Bowditch dies, he leaves Charlie a cassette tape telling a story no one would believe. What Bowditch knows, and has kept secret all his long life, is that inside the shed is a portal to another world.	http://res.cloudinary.com/do0w2gqax/image/upload/v1714768595/81qwIF9iyrL._SY522__soxend.jpg	t	t	user_2fqA46XAktisCZNbg5rgD5bOVOm
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: natalianegron
--

COPY public.users (id, name, checked, reserved) FROM stdin;
user_2fyKmsDyzyN23yz5aohfB1QLTf8	Techtonica Test	{}	{}
user_2fqA46XAktisCZNbg5rgD5bOVOm	Natalia Negron	{14,20}	{18,20,14}
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: natalianegron
--

SELECT pg_catalog.setval('public.books_id_seq', 22, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: natalianegron
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: natalianegron
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: natalianegron
--

GRANT ALL ON SCHEMA public TO me;


--
-- Name: TABLE books; Type: ACL; Schema: public; Owner: natalianegron
--

GRANT ALL ON TABLE public.books TO me;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: natalianegron
--

GRANT ALL ON TABLE public.users TO me;


--
-- PostgreSQL database dump complete
--


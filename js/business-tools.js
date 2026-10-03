(() => {
    const storageKey = 'pelano-enquiry-references';
    const languageKey = 'pelano-language';
    const translations = new Map([
        ['Home', 'Nyumbani'],
        ['About', 'Kuhusu'],
        ['About Us', 'Kuhusu Sisi'],
        ['Products', 'Bidhaa'],
        ['Our Forest Products', 'Bidhaa Zetu za Misitu'],
        ['Services', 'Huduma'],
        ['Gallery', 'Picha'],
        ['Testimonials', 'Maoni ya Wateja'],
        ['Contact', 'Wasiliana'],
        ['Contact Us', 'Wasiliana Nasi'],
        ['Contact Pelano Resources', 'Wasiliana na Pelano Resources'],
        ['Send Us a Message', 'Tutumie Ujumbe'],
        ['Address', 'Anuani'],
        ['Phone', 'Simu'],
        ['Business Hours', 'Saa za Kazi'],
        ['Find Our Location', 'Pata Eneo Letu'],
        ['Full Name *', 'Jina Kamili *'],
        ['Email Address *', 'Anwani ya Barua Pepe *'],
        ['Phone Number', 'Namba ya Simu'],
        ['Inquiry Type *', 'Aina ya Ombi *'],
        ['Message *', 'Ujumbe *'],
        ['Select inquiry type...', 'Chagua aina ya ombi...'],
        ['Product Inquiry', 'Swali kuhusu Bidhaa'],
        ['Bulk Order', 'Oda ya Kiasi Kikubwa'],
        ['Custom Quote Request', 'Ombi la Bei Maalum'],
        ['Business Partnership', 'Ushirikiano wa Kibiashara'],
        ['Send Message', 'Tuma Ujumbe'],
        ['Prepare email', 'Andaa Barua Pepe'],
        ['Prepare WhatsApp', 'Andaa WhatsApp'],
        ['Follow up on this device', 'Fuatilia kwenye kifaa hiki'],
        ['Find an enquiry reference', 'Tafuta kumbukumbu ya ombi'],
        ['Enquiry reference', 'Kumbukumbu ya ombi'],
        ['Check reference', 'Angalia kumbukumbu'],
        ['Quick Links', 'Viungo vya Haraka'],
        ['Contact Info', 'Maelezo ya Mawasiliano'],
        ['Follow Us', 'Tufuatilie'],
        ['Created by', 'Imetengenezwa na'],
        ['Request a tailored quote', 'Omba Bei kwa Mahitaji Yako'],
        ['For business and project enquiries', 'Kwa Maswali ya Biashara na Miradi'],
        ['Tell us what you need. We’ll prepare your enquiry for email or WhatsApp so our team can follow up with product specifications, availability and pricing.', 'Tueleze mahitaji yako. Tutakuandalia ujumbe wa barua pepe au WhatsApp ili timu yetu ithibitishe vipimo, upatikanaji na bei.'],
        ['Products for your enquiry', 'Bidhaa za Ombi Lako'],
        ['No products selected yet. Add products from the catalogue below.', 'Bado hujachagua bidhaa. Ongeza bidhaa kutoka kwenye orodha hapa chini.'],
        ['Full name *', 'Jina kamili *'],
        ['Company / organisation', 'Kampuni / taasisi'],
        ['Business email *', 'Barua pepe ya kazi *'],
        ['Phone / WhatsApp', 'Simu / WhatsApp'],
        ['Estimated quantity', 'Kiasi kinachokadiriwa'],
        ['Delivery location', 'Mahali pa kupeleka bidhaa'],
        ['Required timeframe', 'Muda unaohitajika'],
        ['Dimensions / treatment / project details', 'Vipimo / matibabu / maelezo ya mradi'],
        ['I agree that Pelano Resources may use these details to respond to this enquiry. Information is not submitted to this site; I will send it using my chosen email or WhatsApp app.', 'Nakubali Pelano Resources kutumia maelezo haya kujibu ombi langu. Maelezo hayatumwi kupitia tovuti hii; nitayawasilisha kwa barua pepe au WhatsApp nitakayochagua.'],
        ['Your details are used to prepare this enquiry. When server-backed quote capture is enabled, the request is also sent securely to Pelano Resources for follow-up.', 'Maelezo yako hutumika kuandaa ombi hili. Hifadhi salama ya maombi ikiwashwa, ombi litatumwa kwa Pelano Resources kwa ufuatiliaji.'],
        ['Prepare email enquiry', 'Andaa ombi la barua pepe'],
        ['Prepare WhatsApp enquiry', 'Andaa ombi la WhatsApp'],
        ['Clear information for every project', 'Taarifa wazi kwa kila mradi'],
        ['Specifications and supply details, confirmed for your order', 'Vipimo na maelezo ya usambazaji yatathibitishwa kwa oda yako'],
        ['Dimensions, treatment requirements, current availability, lead times and delivery arrangements depend on the product and project. Share your requirements and our team can confirm the details before you place an order.', 'Vipimo, mahitaji ya matibabu, upatikanaji, muda wa maandalizi na usafirishaji hutegemea bidhaa na mradi. Tueleze mahitaji yako ili timu yetu ithibitishe kabla ya kuagiza.'],
        ['View company and quality information', 'Tazama taarifa za kampuni na ubora'],
        ['Add to quote request', 'Ongeza kwenye ombi la bei'],
        ['Compare', 'Linganisha'],
        ['Remove', 'Ondoa'],
        ['Choose up to 3 products to compare.', 'Chagua hadi bidhaa 3 kulinganisha.'],
        ['Compare selected products', 'Linganisha bidhaa ulizochagua'],
        ['Comparison', 'Ulinganisho'],
        ['Description', 'Maelezo'],
        ['Category', 'Aina'],
        ['Enquiry', 'Ombi'],
        ['Request a quote', 'Omba bei'],
        ['An enquiry reference has been created. Your email or WhatsApp app will open next; the reference does not confirm receipt by Pelano Resources.', 'Namba ya kumbukumbu ya ombi imetengenezwa. Barua pepe au WhatsApp itafunguka; namba hii haithibitishi kuwa Pelano Resources imepokea ujumbe.'],
        ['No products selected. Add at least one product before preparing your quote request.', 'Hakuna bidhaa iliyochaguliwa. Ongeza angalau bidhaa moja kabla ya kuandaa ombi la bei.'],
        ['Please check the required fields and consent before continuing.', 'Tafadhali jaza sehemu zinazohitajika na ukubali masharti kabla ya kuendelea.'],
        ['Please enter a valid email address.', 'Tafadhali weka anwani sahihi ya barua pepe.'],
        ['This reference was not found in this browser. References are not shared between devices.', 'Kumbukumbu hii haikupatikana kwenye kivinjari hiki. Kumbukumbu hazishirikishwi kati ya vifaa.'],
        ['Reference found', 'Kumbukumbu imepatikana'],
        ['Prepared on', 'Imeandaliwa tarehe'],
        ['Channel', 'Njia'],
        ['WhatsApp', 'WhatsApp'],
        ['Email', 'Barua pepe'],
        ['Product', 'Bidhaa'],
        ['All Products', 'Bidhaa Zote'],
        ['Treated Timber', 'Mbao Zilizotibiwa'],
        ['Utility Poles', 'Nguzo za Umeme'],
        ['Telecom Poles', 'Nguzo za Mawasiliano'],
        ['Pallets', 'Paleti'],
        ['Railway Sleepers', 'Vishikio vya Reli'],
        ['View Details', 'Tazama Maelezo'],
        ['Durable treated timber.', 'Mbao zilizotibiwa zinazodumu.'],
        ['Rot-resistant timber for construction and outdoor use.', 'Mbao zinazostahimili kuoza kwa ujenzi na matumizi ya nje.'],
        ['Strong treated poles.', 'Nguzo imara zilizotibiwa.'],
        ['Reliable poles for power infrastructure.', 'Nguzo zinazotegemewa kwa miundombinu ya umeme.'],
        ['High-strength telecom poles.', 'Nguzo imara za mawasiliano.'],
        ['Durable poles designed for telecommunications infrastructure.', 'Nguzo zinazodumu zilizoundwa kwa miundombinu ya mawasiliano.'],
        ['Premium telecom poles for long-distance networks.', 'Nguzo bora za mawasiliano kwa mitandao ya masafa marefu.'],
        ['Extra-durable telecom poles for demanding network installations.', 'Nguzo imara zaidi za mawasiliano kwa usakinishaji wa mitandao unaohitaji uimara.'],
        ['Quality wooden pallets.', 'Paleti za mbao zenye ubora.'],
        ['Durable pallets for storage and transportation.', 'Paleti zinazodumu kwa uhifadhi na usafirishaji.'],
        ['Heavy-duty wooden pallets.', 'Paleti imara za mbao.'],
        ['Industrial-grade pallets for demanding storage and shipping applications.', 'Paleti za kiwango cha viwandani kwa uhifadhi na usafirishaji unaohitaji uimara.'],
        ['Heavy-duty sleepers.', 'Vishikio imara vya reli.'],
        ['Durable sleepers for railway and industrial use.', 'Vishikio vya reli vinavyodumu kwa matumizi ya reli na viwandani.'],
        ['Premium treated railway sleepers.', 'Vishikio bora vya reli vilivyotibiwa.'],
        ['Premium-grade treated sleepers for high-performance railway and industrial applications.', 'Vishikio vilivyotibiwa vya kiwango bora kwa matumizi ya reli na viwandani yenye mahitaji makubwa.'],
        ['Certified structural timber.', 'Mbao za miundo zenye uthibitisho.'],
        ['Grade-certified timber for load-bearing structures.', 'Mbao zenye uthibitisho wa daraja kwa miundo inayobeba mizigo.'],
        ['Availability, dimensions, treatment options, lead times and pricing are confirmed by our team for each enquiry.', 'Timu yetu huthibitisha upatikanaji, vipimo, matibabu, muda wa maandalizi na bei kwa kila ombi.'],
        ['Our products include treated timber, utility and telecom poles, pallets, and railway sleepers. Select a product and tell us how you plan to use it.', 'Bidhaa zetu ni pamoja na mbao zilizotibiwa, nguzo za umeme na mawasiliano, paleti na vishikio vya reli. Chagua bidhaa na utueleze matumizi yake.'],
        ['Pelano Resources is based in Mafinga, Iringa Region, Tanzania.', 'Pelano Resources iko Mafinga, Mkoa wa Iringa, Tanzania.'],
        ['For a quote, share the product, quantity, dimensions or treatment requirements, delivery location and timeframe. Our team will confirm current availability and pricing.', 'Kuomba bei, tuma jina la bidhaa, kiasi, vipimo au mahitaji ya matibabu, mahali pa kupeleka na muda unaohitajika. Timu yetu itathibitisha upatikanaji na bei.'],
        ['Please contact our team for current availability, pricing, technical specifications and delivery arrangements. The website does not publish live stock or prices.', 'Tafadhali wasiliana na timu yetu kwa taarifa za sasa za upatikanaji, bei, vipimo vya kiufundi na usafirishaji. Tovuti haionyeshi akiba au bei za moja kwa moja.'],
        ['Our published contact details list Monday to Saturday, 8:00 AM to 6:00 PM. Sunday is listed as closed.', 'Taarifa zetu za mawasiliano zinaonyesha Jumatatu hadi Jumamosi, saa 8:00–18:00. Jumapili imefungwa.'],
        ['Ask us about treated timber, poles, pallets, railway sleepers, product requirements or how to request a quote.', 'Tuulize kuhusu mbao zilizotibiwa, nguzo, paleti, vishikio vya reli, mahitaji ya bidhaa au jinsi ya kuomba bei.'],
        ['Open contact options', 'Fungua njia za mawasiliano'],
        ['Contact our team', 'Wasiliana na timu yetu'],
        ['Skip to main content', 'Ruka hadi kwenye maudhui makuu'],
        ['Pelano Resources Ltd - Mafinga | Premium Quality Resources', 'Pelano Resources Ltd - Mafinga | Rasilimali Bora'],
        ['Products - Pelano Resources Ltd | Mafinga', 'Bidhaa - Pelano Resources Ltd | Mafinga'],
        ['Contact Pelano Resources Ltd - Mafinga | Get In Touch', 'Wasiliana na Pelano Resources Ltd - Mafinga'],
        ['Pelano Resources Ltd - Premium supplier of treated timber, utility poles, and marine plywood for construction and industrial applications in Tanzania.', 'Pelano Resources Ltd ni msambazaji wa mbao zilizotibiwa, nguzo na plywood ya matumizi ya baharini kwa ujenzi na viwanda nchini Tanzania.'],
        ['Contact Pelano Resources Ltd - Inquire about forest products, request quotes, or discuss bulk orders for timber, poles, and plywood in Tanzania.', 'Wasiliana na Pelano Resources Ltd kuulizia bidhaa za misitu, kuomba bei au kujadili oda za jumla za mbao, nguzo na plywood nchini Tanzania.'],
        ['Our Company', 'Kuhusu Kampuni Yetu'],
        ['About Pelano Resources', 'Kuhusu Pelano Resources'],
        ['supplies timber and related forest products from Mafinga, Tanzania, including treated timber, utility poles, and plywood. Contact our team to confirm suitability for your project.', 'hutoa mbao na bidhaa zinazohusiana na misitu kutoka Mafinga, Tanzania, zikiwemo mbao zilizotibiwa, nguzo na plywood. Wasiliana na timu yetu kuthibitisha ufaafu wa bidhaa kwa mradi wako.'],
        ['We supply timber and related forest products to buyers in Tanzania. Product specifications, supporting documents, availability, and delivery arrangements are confirmed for each enquiry.', 'Tunasambaza mbao na bidhaa zinazohusiana na misitu kwa wanunuzi nchini Tanzania. Vipimo vya bidhaa, nyaraka, upatikanaji na mipango ya usafirishaji huthibitishwa kwa kila ombi.'],
        ['Learn More About Us', 'Fahamu Zaidi Kuhusu Sisi'],
        ['Premium pressure-treated lumber', 'Mbao zilizotibiwa kwa shinikizo zenye ubora wa juu'],
        ['High-quality pressure-treated timber for construction, outdoor frameworks, and long-lasting durability.', 'Mbao bora zilizotibiwa kwa shinikizo kwa ajili ya ujenzi, miundo ya nje na matumizi ya muda mrefu.'],
        ['View Details', 'Tazama Maelezo'],
        ['Infrastructure-grade poles', 'Nguzo za kiwango cha miundombinu'],
        ['Heavy-duty poles for power distribution and telecommunications infrastructure across Tanzania.', 'Nguzo imara kwa usambazaji wa umeme na miundombinu ya mawasiliano kote Tanzania.'],
        ['Industrial-grade materials', 'Nyenzo za kiwango cha viwandani'],
        ['Durable pallets for shipping and storage, plus heavy-duty railway sleepers for rail infrastructure projects.', 'Paleti imara kwa usafirishaji na uhifadhi, pamoja na vishikio imara vya reli kwa miradi ya miundombinu ya reli.'],
        ['View All Products', 'Tazama Bidhaa Zote'],
        ['The Pelano Difference', 'Tofauti ya Pelano'],
        ['Why Choose Pelano Resources', 'Kwa Nini Uchague Pelano Resources'],
        ['Premium Quality', 'Ubora wa Juu'],
        ['Ask our team which treatment options and specifications are available for the product you need.', 'Uliza timu yetu kuhusu chaguo za matibabu na vipimo vinavyopatikana kwa bidhaa unayohitaji.'],
        ['Product Documentation', 'Nyaraka za Bidhaa'],
        ['Ask which grading, treatment, and product documents are available for your requested item.', 'Uliza ni nyaraka zipi za madaraja, matibabu na bidhaa zinazopatikana kwa bidhaa uliyoomba.'],
        ['Reliable Supply', 'Usambazaji Unaotegemewa'],
        ['Availability, order quantities, and delivery dates are confirmed for each enquiry.', 'Upatikanaji, kiasi cha oda na tarehe za usafirishaji huthibitishwa kwa kila ombi.'],
        ['Professional Service', 'Huduma ya Kitaalamu'],
        ['Contact our team with your product requirements to discuss specifications and request a quote.', 'Wasiliana na timu yetu ukiwa na mahitaji ya bidhaa ili kujadili vipimo na kuomba bei.'],
        ['Sustainable Sourcing', 'Upatikanaji Endelevu'],
        ['Ask our team about sourcing information and supporting documentation for the products you are considering.', 'Uliza timu yetu kuhusu taarifa za upatikanaji na nyaraka za kusaidia za bidhaa unazozingatia.'],
        ['Competitive Pricing', 'Bei Shindani'],
        ['Request a quote with your product specifications, quantity, and delivery destination.', 'Omba bei ukituma vipimo vya bidhaa, kiasi na mahali pa kupeleka.'],
        ['Industries & Applications', 'Sekta na Matumizi'],
        ['Industries We Serve', 'Sekta Tunazohudumia'],
        ['Construction', 'Ujenzi'],
        ['Structural timber, decking materials, and framework solutions for residential and commercial projects.', 'Mbao za miundo, vifaa vya sakafu za nje na suluhisho za fremu kwa miradi ya makazi na biashara.'],
        ['Power & Telecom', 'Umeme na Mawasiliano'],
        ['Treated utility poles for electricity and telecommunications infrastructure development.', 'Nguzo zilizotibiwa kwa ajili ya maendeleo ya miundombinu ya umeme na mawasiliano.'],
        ['Transportation', 'Usafirishaji'],
        ['Railway sleepers and structural components for rail infrastructure projects.', 'Vishikio vya reli na vipengele vya miundo kwa miradi ya miundombinu ya reli.'],
        ['Manufacturing', 'Viwanda vya Uzalishaji'],
        ['Industrial plywood and timber for packaging, production, and specialized manufacturing needs.', 'Plywood na mbao za viwandani kwa ajili ya vifungashio, uzalishaji na mahitaji maalum ya utengenezaji.'],
        ['Marine & Water', 'Bahari na Maji'],
        ['Marine-grade plywood and treated lumber for marine construction and water-resistant applications.', 'Plywood ya kiwango cha matumizi ya baharini na mbao zilizotibiwa kwa ujenzi wa baharini na matumizi yanayohitaji kustahimili maji.'],
        ['Infrastructure', 'Miundombinu'],
        ['Large-scale infrastructure projects including bridges, utilities, and industrial facilities.', 'Miradi mikubwa ya miundombinu ikiwemo madaraja, huduma za umma na majengo ya viwanda.'],
        ['What Our Clients Say', 'Wateja Wetu Wanasema Nini'],
        ["We're proud to serve clients who trust us with their needs", 'Tunajivunia kuwahudumia wateja wanaotuamini kukidhi mahitaji yao.'],
        ['View All Testimonials', 'Tazama Maoni Yote ya Wateja'],
        ['Quality resources and products from Mafinga, Tanzania. Committed to excellence and customer satisfaction.', 'Bidhaa na rasilimali bora kutoka Mafinga, Tanzania. Tumejizatiti katika ubora na kuridhika kwa wateja.'],
        ['Pelano Resources Ltd', 'Pelano Resources Ltd'],
        ['© 2026 Pelano Resources Ltd - Mafinga. All rights reserved.', '© 2026 Pelano Resources Ltd - Mafinga. Haki zote zimehifadhiwa.'],
        ['Pelano Resources forest products', 'Bidhaa za misitu za Pelano Resources'],
        ['Treated Timber', 'Mbao Zilizotibiwa'],
        ['Utility & Telecom Poles', 'Nguzo za Umeme na Mawasiliano'],
        ['Pallets & Railway Sleepers', 'Paleti na Vishikio vya Reli'],
        ['Search products...', 'Tafuta bidhaa...'],
        ['Contact Us', 'Wasiliana Nasi'],
        ['Get in touch with Pelano Resources Ltd', 'Wasiliana na Pelano Resources Ltd'],
        ['Reach out for forest product inquiries, bulk orders, custom quotes, or any questions about our treated timber, poles, and plywood solutions.', 'Wasiliana nasi kwa maswali kuhusu bidhaa za misitu, oda za jumla, makadirio maalum ya bei au maelezo kuhusu mbao zetu zilizotibiwa, nguzo na plywood.'],
        ['Mafinga, Tanzania', 'Mafinga, Tanzania'],
        ['Iringa Region', 'Mkoa wa Iringa'],
        ['Available Mon - Sat, 8am - 6pm', 'Tunapatikana Jumatatu–Jumamosi, saa 8:00–18:00'],
        ['Email', 'Barua pepe'],
        ['Response within 24 hours', 'Tutajibu ndani ya saa 24'],
        ['Monday - Saturday: 8:00 AM - 6:00 PM', 'Jumatatu–Jumamosi: saa 8:00–18:00'],
        ['Sunday: Closed', 'Jumapili: Tumefungwa'],
        ['Enter your full name', 'Weka jina lako kamili'],
        ['Describe your inquiry, project details, or order specifications...', 'Eleza swali lako, maelezo ya mradi au vipimo vya oda...'],
        ['your.email@example.com', 'barua.pepe.yako@example.com'],
        ['For', 'Kwa'],
        ['Contact Us', 'Wasiliana Nasi'],
        ['Our Company', 'Kampuni Yetu'],
        ['About Us', 'Kuhusu Sisi'],
        ['Industrial-grade materials', 'Nyenzo za kiwango cha viwandani'],
        ['Premium Telecom Poles', 'Nguzo Bora za Mawasiliano'],
        ['Heavy Duty Pallets', 'Paleti Imara'],
        ['Railway Sleepers', 'Vishikio vya Reli'],
        ['Premium Railway Sleepers', 'Vishikio Bora vya Reli'],
        ['Structural Timber', 'Mbao za Miundo'],
        ['Durable poles for power infrastructure.', 'Nguzo imara zinazodumu kwa miundombinu ya umeme.'],
        ['Premium telecom poles for long-distance networks.', 'Nguzo bora za mawasiliano kwa mitandao ya masafa marefu.'],
        ['Extra-durable telecom poles for demanding network installations.', 'Nguzo imara zaidi za mawasiliano kwa mitandao inayohitaji uimara.'],
        ['Industrial-grade pallets for demanding storage and shipping applications.', 'Paleti za kiwango cha viwandani kwa uhifadhi na usafirishaji unaohitaji uimara.'],
        ['Premium-grade treated sleepers for high-performance railway and industrial applications.', 'Vishikio vilivyotibiwa vya kiwango bora kwa matumizi ya reli na viwandani yenye mahitaji makubwa.'],
        ['Structural timber for load-bearing applications; confirm the required grade and specification for your project.', 'Mbao za miundo kwa matumizi yanayobeba mizigo; thibitisha daraja na vipimo vinavyohitajika kwa mradi wako.'],
        ['Discuss specifications with our team', 'Jadili vipimo na timu yetu'],
        ['Confirm available dimensions and treatment requirements for your application.', 'Thibitisha vipimo vinavyopatikana na mahitaji ya matibabu yanayofaa kwa matumizi yako.'],
        ['Request current availability, lead times and delivery options.', 'Ulizia upatikanaji wa sasa, muda wa maandalizi na machaguo ya usafirishaji.'],
        ['Ask for applicable quality documents and product information.', 'Omba nyaraka husika za ubora na taarifa za bidhaa.'],
        ['Intended use and exposure conditions', 'Matumizi yaliyokusudiwa na mazingira ya matumizi'],
        ['Required dimensions, grade or project specification', 'Vipimo vinavyohitajika, daraja au maelezo ya mradi'],
        ['Treatment requirements defined by your project team', 'Mahitaji ya matibabu yaliyobainishwa na timu ya mradi'],
        ['Estimated quantity and delivery destination', 'Kiasi kinachokadiriwa na mahali pa kupeleka'],
        ['Intended network application', 'Matumizi yaliyokusudiwa ya mtandao'],
        ['Required length, class or project specification', 'Urefu, daraja au maelezo ya mradi yanayohitajika'],
        ['Treatment and documentation requirements', 'Mahitaji ya matibabu na nyaraka'],
        ['Estimated quantity, destination and timeframe', 'Kiasi kinachokadiriwa, mahali pa kupeleka na muda unaohitajika'],
        ['Network application and project standard', 'Matumizi ya mtandao na kiwango cha mradi'],
        ['Required length, class or technical specification', 'Urefu, daraja au vipimo vya kiufundi vinavyohitajika'],
        ['Treatment and inspection documentation', 'Nyaraka za matibabu na ukaguzi'],
        ['Required dimensions and handling equipment', 'Vipimo vinavyohitajika na vifaa vya kushughulikia'],
        ['Load requirements and intended use', 'Mahitaji ya mzigo na matumizi yaliyokusudiwa'],
        ['Any packaging or transport requirements', 'Mahitaji yoyote ya ufungashaji au usafirishaji'],
        ['Intended railway or industrial application', 'Matumizi yaliyokusudiwa ya reli au viwandani'],
        ['Required dimensions and applicable project standard', 'Vipimo vinavyohitajika na kiwango husika cha mradi'],
        ['Treatment and inspection requirements', 'Mahitaji ya matibabu na ukaguzi'],
        ['Review your enquiry', 'Kagua ombi lako'],
        ['Check the details before choosing how to send your request.', 'Kagua maelezo kabla ya kuchagua jinsi ya kutuma ombi lako.'],
        ['Choose products', 'Chagua bidhaa'],
        ['Select one or more catalogue products before continuing.', 'Chagua bidhaa moja au zaidi kwenye katalogi kabla ya kuendelea.'],
        ['Project requirements', 'Mahitaji ya mradi'],
        ['Share what you know. The team can confirm missing specifications with you.', 'Shiriki unachojua. Timu inaweza kuthibitisha vipimo vinavyokosekana pamoja nawe.'],
        ['Your contact details', 'Maelezo yako ya mawasiliano'],
        ['Provide details so the team can respond to your enquiry.', 'Toa maelezo ili timu iweze kujibu ombi lako.'],
        ['Step', 'Hatua'],
        ['of', 'kati ya'],
        ['Back', 'Rudi'],
        ['Continue', 'Endelea'],
        ['Add at least one product to continue.', 'Ongeza angalau bidhaa moja ili kuendelea.'],
        ['Please complete all quote steps before continuing.', 'Tafadhali kamilisha hatua zote za ombi la bei kabla ya kuendelea.'],
        ['Add to quote request', 'Ongeza kwenye ombi la bei'],
        ['I agree that Pelano Resources may use these details to respond to my enquiry. I will send the message using my email or WhatsApp app.', 'Nakubali Pelano Resources kutumia maelezo haya kujibu ombi langu. Nitatuma ujumbe kupitia programu yangu ya barua pepe au WhatsApp.'],
        ['This static website does not submit or store your personal details. Your selected email or WhatsApp app will open with a prepared message.', 'Tovuti hii haitumi wala kuhifadhi taarifa zako binafsi. Programu uliyochagua ya barua pepe au WhatsApp itafunguka ikiwa na ujumbe ulioandaliwa.'],
        ['References are stored only in this browser and identify a prepared message, not receipt or processing by Pelano Resources.', 'Kumbukumbu huhifadhiwa kwenye kivinjari hiki pekee na hutambua ujumbe ulioandaliwa; hazithibitishi kuwa Pelano Resources imepokea au kushughulikia ombi.'],
        ['e.g. PR-20261001-AB12CD', 'mf. PR-20261001-AB12CD']
    ]);

    Object.entries(window.PelanoSwahiliLongform || {}).forEach(([english, swahili]) => {
        translations.set(english, swahili);
    });

    const attributeTranslations = new Map([
        ['Skip to main content', 'Ruka hadi kwenye maudhui makuu'],
        ['Toggle menu', 'Fungua au funga menyu'],
        ['Toggle dark mode', 'Badili mwonekano wa giza au mwanga'],
        ['Back to top', 'Rudi juu ya ukurasa'],
        ['Contact us on WhatsApp', 'Wasiliana nasi kupitia WhatsApp'],
        ['Chat with us on WhatsApp', 'Piga gumzo nasi kupitia WhatsApp'],
        ['Pelano Resources logo', 'Nembo ya Pelano Resources'],
        ['Contact Pelano Resources logo', 'Wasiliana na Pelano Resources'],
        ['Switch language to English', 'Badili lugha iwe Kiingereza'],
        ['Badili lugha iwe Kiswahili', 'Badili lugha iwe Kiswahili'],
        ['Close', 'Funga'],
        ['Close assistant', 'Funga msaidizi'],
        ['Go to slide', 'Nenda kwenye picha'],
        ['Go to testimonial', 'Nenda kwenye ushuhuda'],
        ['Visit our facebook', 'Tembelea ukurasa wetu wa Facebook'],
        ['Visit our twitter', 'Tembelea ukurasa wetu wa X'],
        ['Visit our linkedin', 'Tembelea ukurasa wetu wa LinkedIn'],
        ['Visit our instagram', 'Tembelea ukurasa wetu wa Instagram'],
        ['Visit our youtube', 'Tembelea ukurasa wetu wa YouTube']
    ]);

    function currentLanguage() {
        try {
            const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
            if (requestedLanguage === 'sw' || requestedLanguage === 'en') return requestedLanguage;
            return localStorage.getItem(languageKey) === 'sw' ? 'sw' : 'en';
        } catch (error) {
            console.error('Unable to read the saved language preference.', error);
            return 'en';
        }
    }

    function translateTextNodes(language) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(node => {
            const parent = node.parentElement;
            if (!parent || parent.closest('script, style, textarea, input, .assistant-message, .rfq-status')) return;
            const original = node.__pelanoEnglishText ?? node.nodeValue;
            node.__pelanoEnglishText = original;
            const trimmed = original.trim();
            let swahili = translations.get(trimmed);
            if (!swahili && /^(Go to slide|Go to testimonial) \d+$/.test(trimmed)) {
                const [, action, number] = trimmed.match(/^(Go to slide|Go to testimonial) (\d+)$/);
                swahili = `${action === 'Go to slide' ? 'Nenda kwenye picha' : 'Nenda kwenye ushuhuda'} ${number}`;
            }
            if (!swahili && /^Pelano Resources - .+\.(jpg|jpeg|webp)$/i.test(trimmed)) {
                swahili = trimmed.replace(/^Pelano Resources - /, 'Pelano Resources - Picha ya ');
            }
            if (!swahili) return;
            const leading = original.match(/^\s*/)?.[0] || '';
            const trailing = original.match(/\s*$/)?.[0] || '';
            const translatedText = language === 'sw' ? `${leading}${swahili}${trailing}` : original;
            if (node.nodeValue !== translatedText) node.nodeValue = translatedText;
        });

        document.querySelectorAll('[placeholder], [aria-label], [title], [alt]').forEach(element => {
            ['placeholder', 'aria-label', 'title', 'alt'].forEach(attribute => {
                if (!element.hasAttribute(attribute)) return;
                const originalKey = `pelanoEnglish${attribute.replace(/(^|-)(.)/g, (_, _prefix, letter) => letter.toUpperCase())}`;
                const original = element.dataset[originalKey] ?? element.getAttribute(attribute);
                element.dataset[originalKey] = original;
                let translation = attributeTranslations.get(original) || translations.get(original);
                if (!translation && original.startsWith('Compare ')) {
                    const product = original.slice('Compare '.length);
                    translation = `Linganisha ${translations.get(product) || product}`;
                }
                if (!translation) {
                    const carouselLabel = original.match(/^Go to (slide|testimonial) (\d+)$/);
                    if (carouselLabel) {
                        translation = `${carouselLabel[1] === 'slide' ? 'Nenda kwenye picha' : 'Nenda kwenye ushuhuda'} ${carouselLabel[2]}`;
                    }
                }
                if (language === 'sw' && translation && element.getAttribute(attribute) !== translation) {
                    element.setAttribute(attribute, translation);
                } else if (language === 'en' && element.getAttribute(attribute) !== original) {
                    element.setAttribute(attribute, original);
                }
            });
        });

        document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]').forEach(meta => {
            const original = meta.dataset.pelanoEnglishContent ?? meta.content;
            meta.dataset.pelanoEnglishContent = original;
            const translated = translations.get(original);
            if (language === 'sw' && translated) meta.content = translated;
            else if (language === 'en') meta.content = original;
        });
        document.querySelectorAll('script[type="application/ld+json"]').forEach(schema => {
            if (!schema.dataset.pelanoEnglishSchema) schema.dataset.pelanoEnglishSchema = schema.textContent;
            try {
                const data = JSON.parse(schema.dataset.pelanoEnglishSchema);
                if (data.inLanguage) data.inLanguage = language;
                if (data['@type'] === 'WebPage' || data['@type'] === 'CollectionPage') {
                    const canonical = document.querySelector('link[rel="canonical"]');
                    if (canonical) data.url = canonical.href;
                }
                schema.textContent = JSON.stringify(data);
            } catch (error) {
                console.error('Unable to update the page language in structured data.', error);
            }
        });

        const title = document.querySelector('head > title');
        if (title) {
            title.dataset.pelanoEnglishText ??= title.textContent;
            const translatedTitle = translations.get(title.dataset.pelanoEnglishText);
            if (language === 'sw' && translatedTitle) title.textContent = translatedTitle;
            else if (language === 'en') title.textContent = title.dataset.pelanoEnglishText;
        }
    }

    function applyLanguage(language = currentLanguage()) {
        document.documentElement.lang = language;
        translateTextNodes(language);
        document.querySelectorAll('.map-section iframe').forEach(iframe => {
            const source = iframe.dataset.pelanoEnglishSrc ?? iframe.getAttribute('src');
            iframe.dataset.pelanoEnglishSrc = source;
            if (language === 'sw') iframe.src = `${source}${source.includes('?') ? '&' : '?'}hl=sw`;
            else iframe.src = source;
        });
        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            toggle.textContent = language === 'sw' ? 'English' : 'Kiswahili';
            toggle.setAttribute('aria-label', language === 'sw' ? 'Switch language to English' : 'Badili lugha iwe Kiswahili');
        }
        document.dispatchEvent(new CustomEvent('pelano:languagechange', { detail: { language } }));
    }

    const translationObserver = new MutationObserver(mutations => {
        if (mutations.some(mutation => ['attributes', 'childList', 'characterData'].includes(mutation.type))) {
            translateTextNodes(currentLanguage());
        }
    });
    translationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['alt', 'aria-label', 'placeholder', 'title'],
        childList: true,
        subtree: true,
        characterData: true
    });

    function setupLanguageToggle() {
        const menu = document.querySelector('.nav-menu');
        if (!menu || document.getElementById('language-toggle')) return;
        const item = document.createElement('li');
        item.className = 'language-item';
        const toggle = document.createElement('button');
        toggle.id = 'language-toggle';
        toggle.type = 'button';
        toggle.className = 'language-toggle';
        toggle.addEventListener('click', () => {
            const language = currentLanguage() === 'en' ? 'sw' : 'en';
            try {
                localStorage.setItem(languageKey, language);
            } catch (error) {
                console.error('Unable to save the language preference.', error);
            }
            applyLanguage(language);
        });
        item.append(toggle);
        menu.append(item);
        applyLanguage();
    }

    function readReferences() {
        try {
            const records = JSON.parse(localStorage.getItem(storageKey) || '[]');
            if (!Array.isArray(records)) {
                console.error('The saved enquiry references are not in the expected format.');
                return null;
            }
            return records.filter(record => record && /^PR-\d{8}-[A-F0-9]{6}$/.test(record.code));
        } catch (error) {
            console.error('Unable to read enquiry references from this browser.', error);
            return null;
        }
    }

    function createReference(items = [], channel = 'email') {
        const bytes = new Uint8Array(3);
        try {
            crypto.getRandomValues(bytes);
        } catch (error) {
            console.error('Unable to generate a secure enquiry reference.', error);
            return null;
        }
        const token = [...bytes].map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
        const date = new Date();
        const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
        const record = {
            code: `PR-${datePart}-${token}`,
            createdAt: date.toISOString(),
            channel: channel === 'whatsapp' ? 'whatsapp' : 'email',
            items: items.slice(0, 20).map(item => String(item).slice(0, 100))
        };
        try {
            const records = readReferences();
            if (!records) return null;
            records.push(record);
            localStorage.setItem(storageKey, JSON.stringify(records.slice(-20)));
        } catch (error) {
            console.error('Unable to save an enquiry reference in this browser.', error);
            return null;
        }
        return record;
    }

    function setupReferenceLookup() {
        const form = document.getElementById('reference-lookup');
        if (!form) return;
        const status = document.getElementById('reference-status');
        form.addEventListener('submit', event => {
            event.preventDefault();
            const code = new FormData(form).get('reference').toString().trim().toUpperCase();
            const records = readReferences();
            if (!records) {
                status.textContent = currentLanguage() === 'sw'
                    ? 'Imeshindikana kusoma kumbukumbu zilizohifadhiwa kwenye kivinjari hiki.'
                    : 'Unable to read saved references from this browser.';
                return;
            }
            const record = records.find(item => item.code === code);
            status.replaceChildren();
            if (!record) {
                status.textContent = currentLanguage() === 'sw'
                    ? translations.get('This reference was not found in this browser. References are not shared between devices.')
                    : 'This reference was not found in this browser. References are not shared between devices.';
                return;
            }
            const date = new Date(record.createdAt);
            if (Number.isNaN(date.getTime())) {
                console.error('The stored enquiry reference contains an invalid date.', record);
                status.textContent = 'This reference contains invalid saved details. Please contact Pelano Resources.';
                return;
            }
            const language = currentLanguage();
            const channel = record.channel === 'whatsapp' ? 'WhatsApp' : (language === 'sw' ? 'Barua pepe' : 'Email');
            status.textContent = `${language === 'sw' ? 'Imeandaliwa tarehe' : 'Prepared on'} ${date.toLocaleString(language === 'sw' ? 'sw-TZ' : 'en-TZ')} · ${language === 'sw' ? 'Njia' : 'Channel'}: ${channel}. ${language === 'sw' ? 'Hii haithibitishi kupokelewa kwa ujumbe.' : 'This does not confirm message receipt.'}`;
        });
    }

    const assistantStopWords = new Set([
        'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'could', 'did',
        'do', 'does', 'for', 'from', 'have', 'how', 'i', 'in', 'into', 'is', 'it', 'its',
        'me', 'of', 'on', 'or', 'our', 'please', 'should', 'tell', 'the', 'their', 'them',
        'there', 'these', 'this', 'to', 'was', 'what', 'when', 'where', 'which', 'who',
        'with', 'would', 'you', 'your', 'article', 'discuss', 'explain', 'page', 'site',
        'summarize', 'confirm', 'current', 'exact', 'specific', 'ninyi', 'kwa', 'katika',
        'na', 'ni', 'wa', 'ya', 'za'
    ]);
    const assistantTermAliases = {
        located: 'location',
        locate: 'location',
        where: 'location',
        based: 'location',
        address: 'location',
        eneo: 'location',
        mahali: 'location',
        wapi: 'location',
        mko: 'location',
        bidhaa: 'product',
        products: 'product',
        mbao: 'timber',
        wood: 'timber',
        nguzo: 'pole',
        poles: 'pole',
        pallets: 'pallet',
        sleepers: 'sleeper',
        offer: 'product',
        offers: 'product',
        offering: 'product',
        supply: 'product',
        supplies: 'product',
        huduma: 'service',
        services: 'service',
        treatment: 'service',
        processing: 'service',
        planing: 'service',
        provide: 'service',
        provides: 'service',
        providing: 'service',
        mradi: 'project',
        miradi: 'project',
        projects: 'project',
        mwongozo: 'guide',
        miongozo: 'guide',
        guides: 'guide',
        bei: 'price',
        gharama: 'price',
        cost: 'price',
        pricing: 'price',
        prices: 'price',
        delivery: 'delivery',
        deliver: 'delivery',
        shipping: 'delivery',
        transport: 'delivery',
        availability: 'availability',
        available: 'availability',
        stock: 'availability',
        upatikanaji: 'availability'
    };
    const assistantIntentPages = {
        product: ['/products.html'],
        service: ['/services.html'],
        location: ['/locations.html', '/location-tanzania.html', '/location-iringa.html'],
        price: ['/about.html', '/products.html']
    };
    let assistantKnowledgePromise;
    let assistantKnowledgeResult = null;

    function assistantTokens(value) {
        return value.toLocaleLowerCase().normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .match(/[\p{L}\p{N}]{2,}/gu) || [];
    }

    function extractKnowledgeDocument(documentNode, url) {
        const page = new URL(url, window.location.href);
        const title = documentNode.querySelector('h1')?.textContent?.trim()
            || documentNode.title
            || page.pathname.split('/').pop()
            || 'Pelano Resources';
        const content = documentNode.body.cloneNode(true);
        content.querySelectorAll([
            'script', 'style', 'noscript', 'nav', 'footer', 'form', 'button',
            'input', 'select', 'textarea', 'iframe', '.skip-link', '.breadcrumb',
            '.navbar', '.pelano-assistant', '[hidden]', '[aria-hidden="true"]'
        ].join(',')).forEach(element => element.remove());

        const blocks = [];
        const seen = new Set();
        content.querySelectorAll('h1, h2, h3, h4, p, li, dt, dd, th, td, blockquote').forEach(element => {
            if (element.matches('h1, h2, h3, h4')) return;
            if (element.matches('.product-card .image-description')) return;
            const text = element.textContent.replace(/\s+/g, ' ').trim();
            if (text.length < 20 || seen.has(text)) return;
            seen.add(text);
            const productCard = element.closest('.product-card');
            const serviceCard = element.closest('.service-card');
            const heading = element.parentElement?.closest(
                'article, section, .product-card, .feature-card, .service-card, .industry-card, .project-card, .blog-card, .mv-card'
            )?.querySelector('h2, h3, h4')?.textContent?.trim() || '';
            for (let start = 0; start < text.length;) {
                let end = Math.min(start + 700, text.length);
                if (end < text.length) {
                    const wordBoundary = text.lastIndexOf(' ', end);
                    if (wordBoundary > start) end = wordBoundary;
                }
                blocks.push({
                    title,
                    text: text.slice(start, end).trim(),
                    url: `${page.pathname}${page.search}`,
                    heading,
                    intent: productCard ? 'product' : serviceCard ? 'service' : ''
                });
                start = end;
            }
        });

        return blocks;
    }

    function publicPageUrls(sitemapText) {
        const sitemap = new DOMParser().parseFromString(sitemapText, 'application/xml');
        if (sitemap.querySelector('parsererror')) throw new Error('The site sitemap is not valid XML.');
        const excludedPage = /\/(?:admin|clear-storage|test-mobile-viewport|test-overflow)\.html$/i;
        const canonicalHost = new URL(document.querySelector('link[rel="canonical"]')?.href || window.location.href).hostname;
        const urls = new Set();
        sitemap.querySelectorAll('loc').forEach(location => {
            const value = location.textContent.trim();
            if (!value) return;
            const url = new URL(value, window.location.href);
            if (!/^https?:$/.test(url.protocol) || ![window.location.hostname, canonicalHost, 'pelanoresources.co.tz', 'www.pelanoresources.co.tz'].includes(url.hostname) || excludedPage.test(url.pathname)) return;
            urls.add(new URL(`${url.pathname}${url.search}`, window.location.origin).href);
        });
        return [...urls];
    }

    async function buildAssistantKnowledge() {
        const sitemapResponse = await fetch(new URL('sitemap.xml', window.location.href), { credentials: 'same-origin' });
        if (!sitemapResponse.ok) throw new Error(`The public sitemap request failed with HTTP ${sitemapResponse.status}.`);
        const urls = publicPageUrls(await sitemapResponse.text());
        if (urls.length === 0) throw new Error('The public sitemap did not contain any site pages.');

        const currentUrl = new URL(window.location.href);
        currentUrl.hash = '';
        const documents = extractKnowledgeDocument(document, currentUrl.href);
        const failedPages = [];
        const pageKey = value => {
            const page = new URL(value, window.location.href);
            const pathname = page.pathname === '/' ? '/index.html' : page.pathname;
            return `${pathname}${page.search}`;
        };
        const indexedPages = new Set([pageKey(currentUrl.href)]);
        let indexedArticleCount = 0;
        let nextUrl = 0;
        const workers = Array.from({ length: Math.min(4, urls.length) }, async () => {
            while (nextUrl < urls.length) {
                const url = urls[nextUrl++];
                if (pageKey(url) === pageKey(currentUrl.href)) continue;
                try {
                    const response = await fetch(url, { credentials: 'same-origin' });
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const html = await response.text();
                    const parsed = new DOMParser().parseFromString(html, 'text/html');
                    documents.push(...extractKnowledgeDocument(parsed, url));
                    indexedPages.add(pageKey(url));
                } catch (error) {
                    console.error(`Unable to index public site page ${url}.`, error);
                    failedPages.push(url);
                }
            }
        });
        await Promise.all(workers);

        try {
            if (!window.PelanoBlog) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = new URL('js/blog.js?v=buyer-content-20261002-2', window.location.href).href;
                    script.onload = resolve;
                    script.onerror = () => reject(new Error('The published article module failed to load.'));
                    document.head.append(script);
                });
            }
            if (!window.PelanoBlog) throw new Error('The published article module did not expose its public API.');
            await window.PelanoBlog.ready;
            const publishedPosts = window.PelanoBlog.getPublishedPosts();
            indexedArticleCount = publishedPosts.length;
            publishedPosts.forEach(post => {
                if (!post || typeof post.title !== 'string' || typeof post.slug !== 'string' || !/^[a-z0-9-]+$/.test(post.slug)) return;
                const text = [post.title, post.excerpt, post.content, post.category, ...(post.tags || [])]
                    .filter(value => typeof value === 'string')
                    .join(' ')
                    .replace(/<[^>]*>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                if (text) documents.push({
                    title: post.title,
                    heading: post.title,
                    text,
                    url: `blog-detail.html?slug=${encodeURIComponent(post.slug)}`
                });
            });
        } catch (error) {
            console.error('Published articles could not be added to the assistant index.', error);
            failedPages.push('published articles');
        }

        if (documents.length === 0) throw new Error('No public page content could be indexed.');
        if (failedPages.length) documents.push(...fallbackAssistantKnowledge());
        return { documents, failedPages, indexedPageCount: indexedPages.size, indexedArticleCount };
    }

    function fallbackAssistantKnowledge() {
        const fallbackEntries = [
            {
                title: 'Our Forest Products',
                heading: 'Products',
                intent: 'product',
                path: 'products.html',
                text: 'Pelano Resources supplies treated timber, utility poles, telecom poles, pallets and railway sleepers for construction, power and telecommunications infrastructure, storage, transport, railway and industrial applications. Product grades, dimensions, treatment requirements, availability and supporting documents should be confirmed for each project.'
            },
            {
                title: 'Our Services',
                heading: 'Timber and pole services',
                intent: 'service',
                path: 'services.html',
                text: 'Published services include kiln drying, timber planing, pole skidding, timber and pole treatment, and timber and pole handling. Contact Pelano Resources to confirm the service requirements and suitability for your project.'
            },
            {
                title: 'Request a tailored quote',
                heading: 'How to request a quote',
                intent: 'quote',
                path: 'products.html#request-quote',
                text: 'To request a quote, share the products you need, quantity, dimensions or treatment requirements, delivery destination and preferred timeframe. The website prepares your enquiry for email or WhatsApp; it does not confirm current pricing, stock or delivery until the Pelano team responds.'
            },
            {
                title: 'Locations and supply enquiries',
                heading: 'Location',
                intent: 'location',
                path: 'locations.html',
                text: 'Pelano Resources is based in Mafinga, Iringa Region, Tanzania. Supply and delivery enquiries are assessed according to the destination, order and logistics.'
            },
            {
                title: 'Contact Pelano Resources',
                heading: 'Contact and business hours',
                intent: 'contact',
                path: 'contact.html',
                text: 'Contact Pelano Resources at info@pelanoresources.co.tz or +255 755 885 888. Published business hours are Monday to Saturday, 8:00 AM to 6:00 PM Tanzania time.'
            },
            {
                title: 'Availability and price',
                heading: 'Current pricing and availability',
                intent: 'price',
                path: 'about.html',
                text: 'Current prices, stock, lead times and delivery costs are not published as guaranteed live information. Share your product, quantity, specifications and destination with the team to confirm details for your order.'
            }
        ];
        return fallbackEntries.map(entry => ({
            ...entry,
            url: new URL(entry.path, window.location.href).pathname + new URL(entry.path, window.location.href).hash
        }));
    }

    function loadAssistantKnowledge() {
        if (!assistantKnowledgePromise) {
            assistantKnowledgePromise = buildAssistantKnowledge().then(result => {
                assistantKnowledgeResult = result;
                return result;
            }).catch(error => {
                console.error('The assistant is using its verified fallback content because the published site index could not be loaded.', error);
                const fallback = {
                    documents: fallbackAssistantKnowledge(),
                    failedPages: ['published site index'],
                    indexedPageCount: 0,
                    indexedArticleCount: 0
                };
                assistantKnowledgeResult = fallback;
                return fallback;
            });
        }
        return assistantKnowledgePromise;
    }

    function normalizeAssistantTerm(token) {
        if (assistantTermAliases[token]) return assistantTermAliases[token];
        if (token.length > 4 && token.endsWith('ies')) return token.slice(0, -3) + 'y';
        if (token.length > 4 && token.endsWith('s')) return token.slice(0, -1);
        return token;
    }

    function findAssistantAnswer(question, documents) {
        const queryTerms = [...new Set(assistantTokens(question)
            .map(normalizeAssistantTerm)
            .filter(token => !assistantStopWords.has(token)))];
        if (queryTerms.length === 0) return [];
        const indexedDocuments = documents.map(document => {
            const bodyTerms = new Set(assistantTokens(document.text).map(normalizeAssistantTerm));
            const headingTerms = new Set(assistantTokens(document.heading).map(normalizeAssistantTerm));
            const titleTerms = new Set(assistantTokens(document.title).map(normalizeAssistantTerm));
            return { document, bodyTerms, headingTerms, titleTerms, pathname: new URL(document.url, window.location.href).pathname };
        });
        const documentFrequency = new Map(queryTerms.map(term => [
            term,
            indexedDocuments.filter(({ bodyTerms, headingTerms, titleTerms }) => bodyTerms.has(term) || headingTerms.has(term) || titleTerms.has(term)).length
        ]));
        const ranked = indexedDocuments.map(({ document, bodyTerms, headingTerms, titleTerms, pathname }) => {
            const matched = queryTerms.filter(term => bodyTerms.has(term) || headingTerms.has(term) || titleTerms.has(term));
            const score = matched.reduce((total, term) => {
                const frequency = documentFrequency.get(term) || 0;
                const relevance = Math.log(1 + (indexedDocuments.length - frequency + 0.5) / (frequency + 0.5));
                const pageBoost = (assistantIntentPages[term] || []).includes(pathname) ? 5 : 0;
                const contentBoost = document.intent === term ? 8 : 0;
                return total + relevance * (
                    (bodyTerms.has(term) ? 2 : 0)
                    + (headingTerms.has(term) ? 3 : 0)
                    + (titleTerms.has(term) ? 0.5 : 0)
                ) + pageBoost + contentBoost;
            }, 0);
            return { ...document, score, matched: matched.length };
        }).filter(document => document.score > 0 && document.matched >= Math.min(2, queryTerms.length));
        ranked.sort((first, second) => second.score - first.score || second.matched - first.matched);

        const selected = [];
        const pageCounts = new Map();
        const selectedText = new Set();
        const perPageLimit = queryTerms.some(term => term === 'product' || term === 'service') ? 3 : 2;
        for (const document of ranked) {
            const count = pageCounts.get(document.url) || 0;
            const normalizedText = document.text.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
            if (count >= perPageLimit || selectedText.has(normalizedText)) continue;
            selected.push(document);
            selectedText.add(normalizedText);
            pageCounts.set(document.url, count + 1);
            if (selected.length === 3) break;
        }
        return selected;
    }

    function assistantNoMatchMessage(language) {
        return language === 'sw'
            ? 'Sijaweza kupata jibu la swali hilo katika taarifa zilizochapishwa kwenye tovuti. Tafadhali wasiliana na timu yetu kwa maelezo zaidi.'
            : 'I could not find that in the published website content. Please contact our team for further information.';
    }

    function setupAssistant() {
        if (document.getElementById('pelano-assistant')) return;
        const root = document.createElement('div');
        root.id = 'pelano-assistant';
        root.className = 'pelano-assistant';
        root.innerHTML = `
            <button class="assistant-launcher" type="button" aria-expanded="false" aria-controls="assistant-panel">
                <span aria-hidden="true">?</span><span data-assistant-launch-label>Ask Pelano</span>
            </button>
            <div class="assistant-panel" id="assistant-panel" hidden>
                <div class="assistant-header">
                    <div><strong data-assistant-title>Pelano Resources assistant</strong><p data-assistant-subtitle>Answers from published Pelano Resources content</p></div>
                    <button class="assistant-close" type="button" aria-label="Close assistant">&times;</button>
                </div>
                <div class="assistant-messages" aria-live="polite" aria-relevant="additions text">
                    <p class="assistant-message assistant-answer" data-assistant-welcome>Ask about anything published on our website: products, services, projects, locations, guides and more.</p>
                </div>
                <div class="assistant-quick-questions">
                    <button type="button" data-question="What products do you offer?">Products</button>
                    <button type="button" data-question="How do I request a quote?">Request a quote</button>
                    <button type="button" data-question="Where are you located?">Location</button>
                </div>
                <p class="assistant-status" role="status" aria-live="polite" data-assistant-status></p>
                <form class="assistant-form">
                    <label class="sr-only" for="assistant-question">Ask a question</label>
                    <input id="assistant-question" name="question" maxlength="240" autocomplete="off" required>
                    <button type="submit" data-assistant-send>Ask</button>
                </form>
                <p class="assistant-disclaimer" data-assistant-disclaimer>For exact specifications, stock, lead times and pricing, contact our team.</p>
                <a class="assistant-contact-link" href="contact.html#contact" data-assistant-contact>Contact our team</a>
            </div>`;
        document.body.append(root);
        const launcher = root.querySelector('.assistant-launcher');
        const panel = root.querySelector('.assistant-panel');
        const input = root.querySelector('#assistant-question');
        const messages = root.querySelector('.assistant-messages');
        const close = root.querySelector('.assistant-close');
        const status = root.querySelector('[data-assistant-status]');
        const form = root.querySelector('.assistant-form');
        const send = root.querySelector('[data-assistant-send]');
        let answering = false;

        const setOpen = isOpen => {
            panel.hidden = !isOpen;
            launcher.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) {
                input.focus();
                if (!assistantKnowledgePromise) {
                    status.textContent = currentLanguage() === 'sw' ? 'Inapakia taarifa za tovuti...' : 'Loading published site content...';
                    loadAssistantKnowledge().then(result => {
                        assistantKnowledgeResult = result;
                        status.textContent = result.failedPages.length
                            ? (currentLanguage() === 'sw' ? 'Baadhi ya kurasa hazikupatikana; majibu yanaweza kuwa hayajakamilika.' : 'Some pages could not be loaded; answers may be incomplete.')
                            : (currentLanguage() === 'sw' ? `Taarifa kutoka kurasa ${result.indexedPageCount} na makala ${result.indexedArticleCount} zimepakiwa.` : `Published content from ${result.indexedPageCount} pages and ${result.indexedArticleCount} articles is ready.`);
                    }).catch(error => {
                        console.error('The assistant could not load published site content.', error);
                        status.textContent = currentLanguage() === 'sw'
                            ? 'Imeshindwa kupakia taarifa za tovuti. Tafadhali jaribu tena.'
                            : 'Could not load published site content. Please try again.';
                    });
                }
            }
            else launcher.focus();
        };
        launcher.addEventListener('click', () => setOpen(panel.hidden));
        close.addEventListener('click', () => setOpen(false));
        const answerQuestion = async question => {
            if (answering) return;
            answering = true;
            const language = currentLanguage();
            const questionMessage = document.createElement('p');
            questionMessage.className = 'assistant-message assistant-question';
            questionMessage.textContent = question;
            messages.append(questionMessage);
            send.disabled = true;
            status.textContent = language === 'sw' ? 'Inatafuta kwenye taarifa zilizochapishwa...' : 'Searching published site content...';
            try {
                const { documents, failedPages } = await loadAssistantKnowledge();
                const matches = findAssistantAnswer(question, documents);
                const answerMessage = document.createElement('div');
                answerMessage.className = 'assistant-message assistant-answer';
                if (matches.length) {
                    const introduction = document.createElement('p');
                    introduction.textContent = language === 'sw'
                        ? 'Kulingana na taarifa zilizochapishwa za Pelano Resources:'
                        : 'Based on Pelano Resources’ published information:';
                    answerMessage.append(introduction);
                    matches.forEach(match => {
                        const result = document.createElement('div');
                        result.className = 'assistant-result';
                        if (match.heading && match.heading !== match.title) {
                            const heading = document.createElement('strong');
                            heading.textContent = match.heading;
                            result.append(heading);
                        }
                        const answerText = document.createElement('p');
                        answerText.textContent = match.text;
                        result.append(answerText);
                        answerMessage.append(result);
                    });
                    const sources = document.createElement('div');
                    sources.className = 'assistant-sources';
                    const sourceLabel = document.createElement('span');
                    sourceLabel.textContent = language === 'sw' ? 'Vyanzo:' : 'Sources:';
                    sources.append(sourceLabel);
                    const uniqueSources = [...new Map(matches.map(match => [match.url, match])).values()];
                    uniqueSources.forEach(source => {
                        const link = document.createElement('a');
                        link.href = source.url;
                        link.textContent = source.title;
                        sources.append(link);
                    });
                    answerMessage.append(sources);
                } else {
                    answerMessage.textContent = assistantNoMatchMessage(language);
                }
                messages.append(answerMessage);
                status.textContent = failedPages.length
                    ? (language === 'sw' ? 'Baadhi ya taarifa hazikupatikana; majibu yanaweza kuwa hayajakamilika.' : 'Some site content could not be loaded; answers may be incomplete.')
                    : '';
                while (messages.children.length > 21) {
                    messages.children[1]?.remove();
                    messages.children[1]?.remove();
                }
                messages.scrollTop = messages.scrollHeight;
            } catch (error) {
                console.error('The assistant could not search published site content.', error);
                const answerMessage = document.createElement('p');
                answerMessage.className = 'assistant-message assistant-answer';
                answerMessage.textContent = language === 'sw'
                    ? 'Imeshindwa kutafuta taarifa za tovuti. Tafadhali jaribu tena au wasiliana na timu yetu.'
                    : 'I could not search the published site content. Please try again or contact our team.';
                messages.append(answerMessage);
                status.textContent = language === 'sw' ? 'Imeshindwa kupakia taarifa za tovuti.' : 'Published site content could not be loaded.';
            } finally {
                answering = false;
                send.disabled = false;
            }
        };
        form.addEventListener('submit', event => {
            event.preventDefault();
            const question = input.value.trim();
            if (!question) return;
            answerQuestion(question);
            input.value = '';
        });
        root.querySelector('.assistant-quick-questions').addEventListener('click', event => {
            const button = event.target.closest('button[data-question]');
            if (button) answerQuestion(button.dataset.question);
        });
        root.querySelector('.assistant-form').addEventListener('submit', () => {
            input.value = '';
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !panel.hidden) setOpen(false);
        });
        document.addEventListener('pelano:languagechange', event => {
            const swahili = event.detail.language === 'sw';
            root.querySelector('[data-assistant-launch-label]').textContent = swahili ? 'Uliza Pelano' : 'Ask Pelano';
            root.querySelector('[data-assistant-title]').textContent = swahili ? 'Msaidizi wa Pelano Resources' : 'Pelano Resources assistant';
            root.querySelector('[data-assistant-subtitle]').textContent = swahili ? 'Majibu kutoka maudhui yaliyochapishwa ya Pelano Resources' : 'Answers from published Pelano Resources content';
            root.querySelector('[data-assistant-welcome]').textContent = swahili ? 'Uliza kuhusu taarifa yoyote iliyochapishwa kwenye tovuti yetu: bidhaa, huduma, miradi, maeneo, miongozo na mengine.' : 'Ask about anything published on our website: products, services, projects, locations, guides and more.';
            root.querySelector('#assistant-question').placeholder = swahili ? 'Andika swali lako...' : 'Ask a question...';
            root.querySelector('[data-assistant-send]').textContent = swahili ? 'Uliza' : 'Ask';
            root.querySelector('[data-assistant-disclaimer]').textContent = swahili ? 'Kwa vipimo, akiba, muda na bei kamili, wasiliana na timu yetu.' : 'For exact specifications, stock, lead times and pricing, contact our team.';
            root.querySelector('[data-assistant-contact]').textContent = swahili ? 'Wasiliana na timu yetu' : 'Contact our team';
            if (assistantKnowledgeResult) {
                status.textContent = assistantKnowledgeResult.failedPages.length
                    ? (swahili ? 'Baadhi ya taarifa hazikupatikana; majibu yanaweza kuwa hayajakamilika.' : 'Some site content could not be loaded; answers may be incomplete.')
                    : (swahili ? `Taarifa kutoka kurasa ${assistantKnowledgeResult.indexedPageCount} na makala ${assistantKnowledgeResult.indexedArticleCount} zimepakiwa.` : `Published content from ${assistantKnowledgeResult.indexedPageCount} pages and ${assistantKnowledgeResult.indexedArticleCount} articles is ready.`);
            }
            const quickQuestions = swahili
                ? [['Bidhaa gani mnauza?', 'Bidhaa'], ['Ninaombaje bei?', 'Omba bei'], ['Mko wapi?', 'Eneo']]
                : [['What products do you offer?', 'Products'], ['How do I request a quote?', 'Request a quote'], ['Where are you located?', 'Location']];
            root.querySelectorAll('[data-question]').forEach((button, index) => {
                button.dataset.question = quickQuestions[index][0];
                button.textContent = quickQuestions[index][1];
            });
            close.setAttribute('aria-label', swahili ? 'Funga msaidizi' : 'Close assistant');
        });
        document.dispatchEvent(new CustomEvent('pelano:languagechange', { detail: { language: currentLanguage() } }));
    }

    function loadStyles() {
        if (document.querySelector('link[data-business-tools-styles], link[href*="business-tools.css"]')) return;
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = 'css/business-tools.css?v=mobile-controls-phone-20261002-19';
        stylesheet.dataset.businessToolsStyles = 'true';
        document.head.append(stylesheet);
    }

    window.SiteTools = {
        createReference,
        currentLanguage,
        translate: text => translations.get(text) || text
    };
    loadStyles();
    setupLanguageToggle();
    setupReferenceLookup();
    setupAssistant();
})();

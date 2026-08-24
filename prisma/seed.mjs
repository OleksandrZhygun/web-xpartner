import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "data", "uploads");

function carPlaceholderSvg(label, colorFrom, colorTo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="533" viewBox="0 0 800 533">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colorFrom}"/>
      <stop offset="1" stop-color="${colorTo}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="533" fill="url(#g)"/>
  <g transform="translate(120,230)" fill="none" stroke="#ffffff" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" opacity="0.92">
    <path d="M20 90 L60 20 L200 10 L280 40 L520 40 L560 90 L560 130 L20 130 Z"/>
    <circle cx="100" cy="130" r="34" fill="#0f172a" stroke="#ffffff"/>
    <circle cx="460" cy="130" r="34" fill="#0f172a" stroke="#ffffff"/>
  </g>
  <text x="400" y="470" font-family="Arial, sans-serif" font-size="34" fill="#ffffff" text-anchor="middle" opacity="0.9">${label}</text>
</svg>`;
}

async function seedPlaceholderPhoto(filename, label, colorFrom, colorTo) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const svg = carPlaceholderSvg(label, colorFrom, colorTo);
  await writeFile(path.join(UPLOAD_DIR, filename), svg, "utf-8");
  return `/photos/${filename}`;
}

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-please";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      phone: "+48 000 000 000",
      email: "kontakt@x-partner.pl",
      addressPl: "Kraków, Polska",
      addressUk: "Краків, Польща",
      adminPasswordHash,
    },
  });

  await prisma.pageContent.upsert({
    where: { key: "about" },
    update: {},
    create: {
      key: "about",
      titlePl: "O nas",
      titleUk: "Про нас",
      bodyPl: `X-Partner powstał z prostej obserwacji: wiele osób, które przyjeżdżają do Krakowa i chcą pracować jako kierowcy taxi lub w aplikacjach przewozowych, utyka na tym samym etapie — nie mają auta spełniającego wymogi platform albo nie wiedzą, od czego zacząć formalności.

Łączymy więc dwie rzeczy, które zwykle trzeba załatwiać osobno. Z jednej strony wynajmujemy samochody gotowe do rejestracji w taxi, Uber, Bolt czy FreeNow — z aktualnym przeglądem technicznym i ubezpieczeniem, bez ukrytych warunków w umowie. Z drugiej strony pomagamy znaleźć pracę, kontaktując kierowców z firmami i flotami, które akurat kogoś szukają.

Pracujemy po polsku i po ukraińsku, bo wiemy, że bariera językowa bywa większą przeszkodą niż same przepisy. Każdą sprawę traktujemy indywidualnie — czasem potrzebny jest tylko wynajem auta, czasem tylko kontakt do pracodawcy, a czasem obie rzeczy naraz.

Jesteśmy zespołem działającym w Krakowie i staramy się, żeby pierwszy kontakt z nami kończył się konkretną odpowiedzią, a nie kolejką formularzy do wypełnienia.`,
      bodyUk: `X-Partner з'явився з простого спостереження: багато людей, які приїжджають до Кракова і хочуть працювати водіями таксі або в додатках перевезень, застрягають на одному й тому самому етапі — немає авто, яке відповідає вимогам платформ, або незрозуміло, з чого почати оформлення документів.

Тому ми поєднуємо дві речі, які зазвичай доводиться вирішувати окремо. З одного боку, здаємо в оренду автомобілі, готові до реєстрації в таксі, Uber, Bolt чи FreeNow — з чинним техоглядом і страховкою, без прихованих умов у договорі. З іншого боку, допомагаємо знайти роботу, звʼязуючи водіїв із компаніями та автопарками, які саме зараз когось шукають.

Працюємо польською та українською, бо знаємо: мовний бар'єр часто заважає більше, ніж самі формальності. До кожної справи підходимо індивідуально — іноді потрібна лише оренда авто, іноді лише контакт роботодавця, а іноді обидві речі одразу.

Ми команда, що працює в Кракові, і намагаємось, щоб перший контакт з нами закінчувався конкретною відповіддю, а не черговою анкетою для заповнення.`,
    },
  });

  await prisma.pageContent.upsert({
    where: { key: "privacy" },
    update: {},
    create: {
      key: "privacy",
      titlePl: "Polityka prywatności",
      titleUk: "Політика конфіденційності",
      bodyPl: `1. Administrator danych
Administratorem danych osobowych przetwarzanych w związku z korzystaniem ze strony x-partner.pl jest X-Partner, Kraków, Polska. Kontakt w sprawach ochrony danych: kontakt@x-partner.pl.

2. Jakie dane zbieramy
Poprzez formularze na stronie (zapytanie o auto, zgłoszenie na kierowcę, formularz kontaktowy) zbieramy: imię i nazwisko, numer telefonu oraz treść wiadomości, jeśli zostanie dodana. Podanie danych jest dobrowolne, ale niezbędne, aby móc się z Tobą skontaktować.

3. Cel i podstawa prawna przetwarzania
Dane przetwarzamy w celu odpowiedzi na zapytanie dotyczące wynajmu auta lub oferty pracy oraz w celu podjęcia działań poprzedzających ewentualne zawarcie umowy (art. 6 ust. 1 lit. b RODO), a także na podstawie naszego prawnie uzasadnionego interesu polegającego na prowadzeniu kontaktu z osobami zainteresowanymi ofertą (art. 6 ust. 1 lit. f RODO).

4. Okres przechowywania danych
Dane ze zgłoszeń przechowujemy przez czas niezbędny do obsługi zapytania oraz przez okres, w którym może dojść do zawarcia umowy, nie dłużej jednak niż 24 miesiące od ostatniego kontaktu, chyba że dłuższy okres wynika z przepisów prawa (np. przepisów podatkowych w przypadku zawarcia umowy).

5. Odbiorcy danych
Dane mogą być powierzone podmiotom wspierającym nas technicznie (np. hosting, poczta elektroniczna) na podstawie umów powierzenia przetwarzania danych. Nie sprzedajemy danych osobowych innym podmiotom.

6. Twoje prawa
Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie. Przysługuje Ci również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.

7. Pliki cookies
Strona wykorzystuje wyłącznie niezbędne pliki cookies (np. utrzymanie sesji w panelu administracyjnym). Nie stosujemy plików cookies do celów marketingowych ani analitycznych bez odrębnej zgody.

8. Zmiany polityki
Niniejsza polityka może być aktualizowana. Aktualna wersja jest zawsze dostępna pod tym adresem.`,
      bodyUk: `1. Адміністратор даних
Адміністратором персональних даних, що обробляються у зв'язку з користуванням сайтом x-partner.pl, є X-Partner, Краків, Польща. Контакт з питань захисту даних: kontakt@x-partner.pl.

2. Які дані ми збираємо
Через форми на сайті (запит про авто, заявка на посаду водія, контактна форма) ми збираємо: ім'я та прізвище, номер телефону та текст повідомлення, якщо його додано. Надання даних є добровільним, але необхідним для того, щоб ми могли з вами зв'язатися.

3. Мета та правова підстава обробки
Дані обробляються з метою відповіді на запит щодо оренди авто чи вакансії, а також з метою вжиття заходів до можливого укладення договору (ст. 6(1)(b) GDPR), а також на підставі нашого законного інтересу — підтримання контакту з особами, зацікавленими пропозицією (ст. 6(1)(f) GDPR).

4. Термін зберігання даних
Дані із заявок зберігаються протягом часу, необхідного для обробки запиту, а також протягом періоду, коли можливе укладення договору, але не довше 24 місяців з моменту останнього контакту, якщо довший термін не випливає з норм права (наприклад, податкового законодавства у разі укладення договору).

5. Отримувачі даних
Дані можуть передаватися суб'єктам, які надають нам технічну підтримку (наприклад, хостинг, електронна пошта) на підставі договорів доручення обробки даних. Ми не продаємо персональні дані третім особам.

6. Ваші права
Ви маєте право на доступ до своїх даних, їх виправлення, видалення, обмеження обробки, перенесення даних, а також на заперечення проти обробки, що ґрунтується на законному інтересі. Ви також маєте право подати скаргу до органу захисту персональних даних (Prezes UODO).

7. Файли cookie
Сайт використовує лише необхідні файли cookie (наприклад, для підтримки сесії в адміністративній панелі). Ми не використовуємо cookie для маркетингових чи аналітичних цілей без окремої згоди.

8. Зміни політики
Ця політика може оновлюватися. Актуальна версія завжди доступна за цією адресою.`,
    },
  });

  await prisma.pageContent.upsert({
    where: { key: "contact" },
    update: {},
    create: {
      key: "contact",
      titlePl: "Kontakt",
      titleUk: "Контакти",
      bodyPl: `Najszybciej odpowiadamy na wiadomości wysłane przez formularz poniżej — zostaw numer telefonu, a oddzwonimy. Możesz też zadzwonić lub napisać bezpośrednio, korzystając z danych obok.`,
      bodyUk: `Найшвидше відповідаємо на повідомлення, надіслані через форму нижче — залиште номер телефону, і ми зателефонуємо. Також можна зателефонувати або написати напряму, скориставшись контактами поруч.`,
    },
  });

  const existingCars = await prisma.car.count();
  if (existingCars === 0) {
    const photo1 = await seedPlaceholderPhoto("demo-corolla.svg", "Toyota Corolla", "#0f172a", "#334155");
    const photo2 = await seedPlaceholderPhoto("demo-octavia.svg", "Skoda Octavia", "#1e293b", "#0f766e");
    const photo3 = await seedPlaceholderPhoto("demo-passat.svg", "VW Passat", "#1e293b", "#7c2d12");

    await prisma.car.create({
      data: {
        order: 1,
        available: true,
        titlePl: "Toyota Corolla 1.6",
        titleUk: "Toyota Corolla 1.6",
        descriptionPl:
          "Ekonomiczna i niezawodna — jeden z najczęściej wybieranych modeli do pracy w aplikacjach przewozowych. Klimatyzacja, niskie spalanie, aktualny przegląd.",
        descriptionUk:
          "Економічна та надійна — одна з найпопулярніших моделей для роботи в додатках перевезень. Кондиціонер, низька витрата палива, чинний техогляд.",
        price: 130,
        priceUnitPl: "dzień",
        priceUnitUk: "день",
        photos: { create: [{ url: photo1, order: 0 }] },
      },
    });

    await prisma.car.create({
      data: {
        order: 2,
        available: true,
        titlePl: "Skoda Octavia Combi",
        titleUk: "Skoda Octavia Combi",
        descriptionPl:
          "Przestronne kombi, dobre na dłuższe kursy i większy bagaż. Świetny wybór, jeśli planujesz też przewozy paczek lub więcej pasażerów z bagażem.",
        descriptionUk:
          "Просторий універсал, добре підходить для довших поїздок і більшого багажу. Гарний вибір, якщо плануєте також перевезення посилок або пасажирів із багажем.",
        price: 150,
        priceUnitPl: "dzień",
        priceUnitUk: "день",
        photos: { create: [{ url: photo2, order: 0 }] },
      },
    });

    await prisma.car.create({
      data: {
        order: 3,
        available: false,
        titlePl: "Volkswagen Passat B8",
        titleUk: "Volkswagen Passat B8",
        descriptionPl:
          "Komfortowy sedan klasy średniej, wysoko ceniony przez pasażerów. Aktualnie wynajęty — zapytaj o termin dostępności.",
        descriptionUk:
          "Комфортний седан середнього класу, високо оцінюється пасажирами. Наразі орендований — запитайте про дату наступної доступності.",
        price: 170,
        priceUnitPl: "dzień",
        priceUnitUk: "день",
        photos: { create: [{ url: photo3, order: 0 }] },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

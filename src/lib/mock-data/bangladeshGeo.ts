export interface UpazilaInfo {
  name: string;
  bengali: string;
  mouzas: { name: string; bengali: string; jl: string; defaultDag: string; defaultKhatian: string }[];
}

export interface DistrictInfo {
  name: string;
  bengali: string;
  upazilas: Record<string, UpazilaInfo>;
}

export interface DivisionInfo {
  name: string;
  bengali: string;
  districts: Record<string, DistrictInfo>;
}

/**
 * Complete Geographic Dataset for Bangladesh:
 * All 8 Divisions and All 64 Districts with Upazilas & Representative Mouzas
 */
export const BANGLADESH_GEO_DATA: Record<string, DivisionInfo> = {
  // ==========================================
  // 1. DHAKA DIVISION (১৩টি জেলা / 13 Districts)
  // ==========================================
  Dhaka: {
    name: 'Dhaka',
    bengali: 'ঢাকা',
    districts: {
      Dhaka: {
        name: 'Dhaka',
        bengali: 'ঢাকা',
        upazilas: {
          Gulshan: {
            name: 'Gulshan',
            bengali: 'গুলশান',
            mouzas: [
              { name: 'Gulshan', bengali: 'গুলশান', jl: '05', defaultDag: '85', defaultKhatian: '991' },
              { name: 'Banani', bengali: 'বনানী', jl: '06', defaultDag: '142', defaultKhatian: '810' },
              { name: 'Baridhara', bengali: 'বারিধারা', jl: '07', defaultDag: '93', defaultKhatian: '725' },
            ],
          },
          Tejgaon: {
            name: 'Tejgaon',
            bengali: 'তেজগাঁও',
            mouzas: [
              { name: 'Tejgaon I/A', bengali: 'তেজগাঁও শিল্প এলাকা', jl: '14', defaultDag: '402', defaultKhatian: '1204' },
              { name: 'Kawran Bazar', bengali: 'কাওরান বাজার', jl: '15', defaultDag: '105', defaultKhatian: '410' },
              { name: 'Nakhalpara', bengali: 'নাখালপাড়া', jl: '16', defaultDag: '220', defaultKhatian: '650' },
            ],
          },
          Dhanmondi: {
            name: 'Dhanmondi',
            bengali: 'ধানমন্ডি',
            mouzas: [
              { name: 'Dhanmondi R/A', bengali: 'ধানমন্ডি আ/এ', jl: '08', defaultDag: '118', defaultKhatian: '541' },
              { name: 'Jigatola', bengali: 'জিগাতলা', jl: '09', defaultDag: '78', defaultKhatian: '320' },
              { name: 'Kalabagan', bengali: 'কলাবাগান', jl: '10', defaultDag: '215', defaultKhatian: '490' },
            ],
          },
          Mirpur: {
            name: 'Mirpur',
            bengali: 'মিরপুর',
            mouzas: [
              { name: 'Senpara Parbata', bengali: 'সেনপাড়া পর্বতা', jl: '18', defaultDag: '304', defaultKhatian: '580' },
              { name: 'Paikpara', bengali: 'পাইকপাড়া', jl: '19', defaultDag: '155', defaultKhatian: '390' },
            ],
          },
          Savar: {
            name: 'Savar',
            bengali: 'সাভার',
            mouzas: [
              { name: 'Aminbazar', bengali: 'আমিনবাজার', jl: '22', defaultDag: '999', defaultKhatian: '301' },
              { name: 'Hemayetpur', bengali: 'হেমায়েতপুর', jl: '23', defaultDag: '450', defaultKhatian: '612' },
              { name: 'Ashulia', bengali: 'আশুলিয়া', jl: '24', defaultDag: '180', defaultKhatian: '405' },
            ],
          },
        },
      },
      Gazipur: {
        name: 'Gazipur',
        bengali: 'গাজীপুর',
        upazilas: {
          'Gazipur Sadar': {
            name: 'Gazipur Sadar',
            bengali: 'গাজীপুর সদর',
            mouzas: [
              { name: 'Joydebpur', bengali: 'জয়দেবপুর', jl: '12', defaultDag: '201', defaultKhatian: '440' },
              { name: 'Chowrasta', bengali: 'চৌরাস্তা', jl: '13', defaultDag: '315', defaultKhatian: '512' },
            ],
          },
          Kaliakair: {
            name: 'Kaliakair',
            bengali: 'কালিয়াকৈর',
            mouzas: [
              { name: 'Chandra', bengali: 'চন্দ্রা', jl: '30', defaultDag: '112', defaultKhatian: '290' },
            ],
          },
          Sreepur: {
            name: 'Sreepur',
            bengali: 'শ্রীপুর',
            mouzas: [
              { name: 'Maona', bengali: 'মাওনা', jl: '45', defaultDag: '88', defaultKhatian: '198' },
            ],
          },
        },
      },
      Narayanganj: {
        name: 'Narayanganj',
        bengali: 'নারায়ণগঞ্জ',
        upazilas: {
          'Narayanganj Sadar': {
            name: 'Narayanganj Sadar',
            bengali: 'নারায়ণগঞ্জ সদর',
            mouzas: [
              { name: 'Chashara', bengali: 'চাষাড়া', jl: '04', defaultDag: '95', defaultKhatian: '380' },
              { name: 'Fatullah', bengali: 'ফতুল্লা', jl: '05', defaultDag: '412', defaultKhatian: '620' },
            ],
          },
          Sonargaon: {
            name: 'Sonargaon',
            bengali: 'সোনারগাঁও',
            mouzas: [
              { name: 'Mograpara', bengali: 'মোগরাপাড়া', jl: '18', defaultDag: '144', defaultKhatian: '230' },
            ],
          },
          Rupganj: {
            name: 'Rupganj',
            bengali: 'রূপগঞ্জ',
            mouzas: [
              { name: 'Murapara', bengali: 'মুড়াপাড়া', jl: '09', defaultDag: '250', defaultKhatian: '340' },
            ],
          },
        },
      },
      Tangail: {
        name: 'Tangail',
        bengali: 'টাঙ্গাইল',
        upazilas: {
          'Tangail Sadar': {
            name: 'Tangail Sadar',
            bengali: 'টাঙ্গাইল সদর',
            mouzas: [
              { name: 'Santosh', bengali: 'সন্তোষ', jl: '03', defaultDag: '115', defaultKhatian: '260' },
              { name: 'Kagmari', bengali: 'কাগমারী', jl: '04', defaultDag: '189', defaultKhatian: '315' },
            ],
          },
          Mirzapur: {
            name: 'Mirzapur',
            bengali: 'মির্জাপুর',
            mouzas: [
              { name: 'Gorai', bengali: 'গোড়াই', jl: '14', defaultDag: '76', defaultKhatian: '190' },
            ],
          },
        },
      },
      Kishoreganj: {
        name: 'Kishoreganj',
        bengali: 'কিশোরগঞ্জ',
        upazilas: {
          'Kishoreganj Sadar': {
            name: 'Kishoreganj Sadar',
            bengali: 'কিশোরগঞ্জ সদর',
            mouzas: [
              { name: 'Gaital', bengali: 'গাইটাল', jl: '08', defaultDag: '92', defaultKhatian: '210' },
            ],
          },
          Bhairab: {
            name: 'Bhairab',
            bengali: 'ভৈরব',
            mouzas: [
              { name: 'Bhairab Bazar', bengali: 'ভৈরব বাজার', jl: '02', defaultDag: '130', defaultKhatian: '280' },
            ],
          },
        },
      },
      Manikganj: {
        name: 'Manikganj',
        bengali: 'মানিকগঞ্জ',
        upazilas: {
          'Manikganj Sadar': {
            name: 'Manikganj Sadar',
            bengali: 'মানিকগঞ্জ সদর',
            mouzas: [
              { name: 'Beutha', bengali: 'বেউথা', jl: '05', defaultDag: '102', defaultKhatian: '185' },
            ],
          },
          Singair: {
            name: 'Singair',
            bengali: 'সিংগাইর',
            mouzas: [
              { name: 'Joymantop', bengali: 'জায়মন্টপ', jl: '11', defaultDag: '84', defaultKhatian: '160' },
            ],
          },
        },
      },
      Munshiganj: {
        name: 'Munshiganj',
        bengali: 'মুন্সীগঞ্জ',
        upazilas: {
          'Munshiganj Sadar': {
            name: 'Munshiganj Sadar',
            bengali: 'মুন্সীগঞ্জ সদর',
            mouzas: [
              { name: 'Idrakpur', bengali: 'ইদ্রাকপুর', jl: '01', defaultDag: '65', defaultKhatian: '140' },
            ],
          },
          Sreenagar: {
            name: 'Sreenagar',
            bengali: 'শ্রীনগর',
            mouzas: [
              { name: 'Hashara', bengali: 'হাঁসাড়া', jl: '07', defaultDag: '150', defaultKhatian: '230' },
            ],
          },
        },
      },
      Narsingdi: {
        name: 'Narsingdi',
        bengali: 'নরসিংদী',
        upazilas: {
          'Narsingdi Sadar': {
            name: 'Narsingdi Sadar',
            bengali: 'নরসিংদী সদর',
            mouzas: [
              { name: 'Madhabdi', bengali: 'মাধবদী', jl: '10', defaultDag: '220', defaultKhatian: '410' },
              { name: 'Velanagar', bengali: 'ভেলারনগর', jl: '12', defaultDag: '95', defaultKhatian: '180' },
            ],
          },
          Raipura: {
            name: 'Raipura',
            bengali: 'রায়পুরা',
            mouzas: [
              { name: 'Hasnabad', bengali: 'হাসনাবাদ', jl: '06', defaultDag: '78', defaultKhatian: '135' },
            ],
          },
        },
      },
      Faridpur: {
        name: 'Faridpur',
        bengali: 'ফরিদপুর',
        upazilas: {
          'Faridpur Sadar': {
            name: 'Faridpur Sadar',
            bengali: 'ফরিদপুর সদর',
            mouzas: [
              { name: 'Goalchamot', bengali: 'গোয়ালচামট', jl: '02', defaultDag: '110', defaultKhatian: '250' },
              { name: 'Alipur', bengali: 'আলীপুর', jl: '03', defaultDag: '85', defaultKhatian: '190' },
            ],
          },
          Bhanga: {
            name: 'Bhanga',
            bengali: 'ভাঙ্গা',
            mouzas: [
              { name: 'Bhanga Bazar', bengali: 'ভাঙ্গা বাজার', jl: '05', defaultDag: '60', defaultKhatian: '145' },
            ],
          },
        },
      },
      Gopalganj: {
        name: 'Gopalganj',
        bengali: 'গোপালগঞ্জ',
        upazilas: {
          'Gopalganj Sadar': {
            name: 'Gopalganj Sadar',
            bengali: 'গোপালগঞ্জ সদর',
            mouzas: [
              { name: 'Haridaspur', bengali: 'হরিদাসপুর', jl: '07', defaultDag: '90', defaultKhatian: '215' },
            ],
          },
          Tungipara: {
            name: 'Tungipara',
            bengali: 'টুঙ্গিপাড়া',
            mouzas: [
              { name: 'Patgati', bengali: 'পাটগাতী', jl: '01', defaultDag: '45', defaultKhatian: '110' },
            ],
          },
        },
      },
      Madaripur: {
        name: 'Madaripur',
        bengali: 'মাদারীপুর',
        upazilas: {
          'Madaripur Sadar': {
            name: 'Madaripur Sadar',
            bengali: 'মাদারীপুর সদর',
            mouzas: [
              { name: 'Mostafapur', bengali: 'মোস্তফাপুর', jl: '04', defaultDag: '70', defaultKhatian: '160' },
            ],
          },
          Shibchar: {
            name: 'Shibchar',
            bengali: 'শিবচর',
            mouzas: [
              { name: 'Kadirpur', bengali: 'কাদিরপুর', jl: '08', defaultDag: '55', defaultKhatian: '125' },
            ],
          },
        },
      },
      Rajbari: {
        name: 'Rajbari',
        bengali: 'রাজবাড়ী',
        upazilas: {
          'Rajbari Sadar': {
            name: 'Rajbari Sadar',
            bengali: 'রাজবাড়ী সদর',
            mouzas: [
              { name: 'Bhabanipur', bengali: 'ভবানীপুর', jl: '03', defaultDag: '80', defaultKhatian: '175' },
            ],
          },
          Goalanda: {
            name: 'Goalanda',
            bengali: 'গোয়ালন্দ',
            mouzas: [
              { name: 'Daulatdia', bengali: 'দৌলতদিয়া', jl: '09', defaultDag: '120', defaultKhatian: '230' },
            ],
          },
        },
      },
      Shariatpur: {
        name: 'Shariatpur',
        bengali: 'শরীয়তপুর',
        upazilas: {
          'Shariatpur Sadar': {
            name: 'Shariatpur Sadar',
            bengali: 'শরীয়তপুর সদর',
            mouzas: [
              { name: 'Palong', bengali: 'পালং', jl: '02', defaultDag: '65', defaultKhatian: '140' },
            ],
          },
          Naria: {
            name: 'Naria',
            bengali: 'নড়িয়া',
            mouzas: [
              { name: 'Gharisar', bengali: 'ঘড়িসার', jl: '05', defaultDag: '50', defaultKhatian: '115' },
            ],
          },
        },
      },
    },
  },

  // ==========================================
  // 2. CHITTAGONG DIVISION (১১টি জেলা / 11 Districts)
  // ==========================================
  Chittagong: {
    name: 'Chittagong',
    bengali: 'চট্টগ্রাম',
    districts: {
      Chittagong: {
        name: 'Chittagong',
        bengali: 'চট্টগ্রাম',
        upazilas: {
          Kotwali: {
            name: 'Kotwali',
            bengali: 'কোতোয়ালী',
            mouzas: [
              { name: 'Anderkilla', bengali: 'আন্দরকিল্লা', jl: '01', defaultDag: '120', defaultKhatian: '310' },
              { name: 'Firingee Bazar', bengali: 'ফিরিঙ্গী বাজার', jl: '02', defaultDag: '95', defaultKhatian: '220' },
            ],
          },
          Panchlaish: {
            name: 'Panchlaish',
            bengali: 'পাঁচলাইশ',
            mouzas: [
              { name: 'Nasirabad', bengali: 'নাসিরাবাদ', jl: '03', defaultDag: '210', defaultKhatian: '540' },
              { name: 'Khulshi', bengali: 'খুলশী', jl: '04', defaultDag: '180', defaultKhatian: '460' },
            ],
          },
          Hathazari: {
            name: 'Hathazari',
            bengali: 'হাটহাজারী',
            mouzas: [
              { name: 'Fatehabad', bengali: 'ফতেহাবাদ', jl: '11', defaultDag: '140', defaultKhatian: '300' },
            ],
          },
        },
      },
      "Cox's Bazar": {
        name: "Cox's Bazar",
        bengali: 'কক্সবাজার',
        upazilas: {
          "Cox's Bazar Sadar": {
            name: "Cox's Bazar Sadar",
            bengali: 'কক্সবাজার সদর',
            mouzas: [
              { name: 'Jhilwanja', bengali: 'ঝিলংজা', jl: '05', defaultDag: '80', defaultKhatian: '210' },
              { name: 'Kolatoli', bengali: 'কলাতলী', jl: '06', defaultDag: '150', defaultKhatian: '380' },
            ],
          },
          Teknaf: {
            name: 'Teknaf',
            bengali: 'টেকনাফ',
            mouzas: [
              { name: 'Sabrang', bengali: 'সাবরাং', jl: '14', defaultDag: '65', defaultKhatian: '140' },
            ],
          },
        },
      },
      Comilla: {
        name: 'Comilla',
        bengali: 'কুমিল্লা',
        upazilas: {
          'Adarsha Sadar': {
            name: 'Adarsha Sadar',
            bengali: 'আদর্শ সদর',
            mouzas: [
              { name: 'Kandirpar', bengali: 'কান্দিরপাড়', jl: '02', defaultDag: '115', defaultKhatian: '290' },
              { name: 'Shasongachha', bengali: 'শাসনগাছা', jl: '03', defaultDag: '160', defaultKhatian: '340' },
            ],
          },
          Daudkandi: {
            name: 'Daudkandi',
            bengali: 'দাউদকান্দি',
            mouzas: [
              { name: 'Gouripur', bengali: 'গৌরীপুর', jl: '09', defaultDag: '75', defaultKhatian: '180' },
            ],
          },
        },
      },
      Brahmanbaria: {
        name: 'Brahmanbaria',
        bengali: 'ব্রাহ্মণবাড়িয়া',
        upazilas: {
          'Brahmanbaria Sadar': {
            name: 'Brahmanbaria Sadar',
            bengali: 'ব্রাহ্মণবাড়িয়া সদর',
            mouzas: [
              { name: 'Medda', bengali: 'মেদ্দা', jl: '04', defaultDag: '105', defaultKhatian: '240' },
            ],
          },
          Ashuganj: {
            name: 'Ashuganj',
            bengali: 'আশুগঞ্জ',
            mouzas: [
              { name: 'Char Chartala', bengali: 'চর চারতলা', jl: '08', defaultDag: '130', defaultKhatian: '290' },
            ],
          },
        },
      },
      Chandpur: {
        name: 'Chandpur',
        bengali: 'চাঁদপুর',
        upazilas: {
          'Chandpur Sadar': {
            name: 'Chandpur Sadar',
            bengali: 'চাঁদপুর সদর',
            mouzas: [
              { name: 'Puran Bazar', bengali: 'পুরান বাজার', jl: '01', defaultDag: '90', defaultKhatian: '220' },
            ],
          },
          Hajiganj: {
            name: 'Hajiganj',
            bengali: 'হাজীগঞ্জ',
            mouzas: [
              { name: 'Barkul', bengali: 'বড়কুল', jl: '07', defaultDag: '70', defaultKhatian: '150' },
            ],
          },
        },
      },
      Feni: {
        name: 'Feni',
        bengali: 'ফেনী',
        upazilas: {
          'Feni Sadar': {
            name: 'Feni Sadar',
            bengali: 'ফেনী সদর',
            mouzas: [
              { name: 'Rampur', bengali: 'রামপুর', jl: '03', defaultDag: '85', defaultKhatian: '190' },
            ],
          },
          Daganbhuiyan: {
            name: 'Daganbhuiyan',
            bengali: 'দাগনভূঞা',
            mouzas: [
              { name: 'Rajapur', bengali: 'রাজাপুর', jl: '06', defaultDag: '60', defaultKhatian: '130' },
            ],
          },
        },
      },
      Lakshmipur: {
        name: 'Lakshmipur',
        bengali: 'লক্ষ্মীপুর',
        upazilas: {
          'Lakshmipur Sadar': {
            name: 'Lakshmipur Sadar',
            bengali: 'লক্ষ্মীপুর সদর',
            mouzas: [
              { name: 'Samaspur', bengali: 'সামাসপুর', jl: '05', defaultDag: '75', defaultKhatian: '160' },
            ],
          },
          Ramganj: {
            name: 'Ramganj',
            bengali: 'রামগঞ্জ',
            mouzas: [
              { name: 'Kanchanpur', bengali: 'কাঞ্চনপুর', jl: '08', defaultDag: '50', defaultKhatian: '120' },
            ],
          },
        },
      },
      Noakhali: {
        name: 'Noakhali',
        bengali: 'নোয়াখালী',
        upazilas: {
          'Noakhali Sadar': {
            name: 'Noakhali Sadar',
            bengali: 'নোয়াখালী সদর',
            mouzas: [
              { name: 'Maijdee', bengali: 'মাইজদী', jl: '02', defaultDag: '95', defaultKhatian: '215' },
            ],
          },
          Begumganj: {
            name: 'Begumganj',
            bengali: 'বেগমগঞ্জ',
            mouzas: [
              { name: 'Chowmuhani', bengali: 'চৌমুহনী', jl: '07', defaultDag: '140', defaultKhatian: '310' },
            ],
          },
        },
      },
      Bandarban: {
        name: 'Bandarban',
        bengali: 'বান্দরবান',
        upazilas: {
          'Bandarban Sadar': {
            name: 'Bandarban Sadar',
            bengali: 'বান্দরবান সদর',
            mouzas: [
              { name: 'Balaghata', bengali: 'বালাঘাটা', jl: '01', defaultDag: '50', defaultKhatian: '110' },
            ],
          },
        },
      },
      Khagrachhari: {
        name: 'Khagrachhari',
        bengali: 'খাগড়াছড়ি',
        upazilas: {
          'Khagrachhari Sadar': {
            name: 'Khagrachhari Sadar',
            bengali: 'খাগড়াছড়ি সদর',
            mouzas: [
              { name: 'Pankhaiyapara', bengali: 'পানখাইয়াপাড়া', jl: '01', defaultDag: '45', defaultKhatian: '105' },
            ],
          },
        },
      },
      Rangamati: {
        name: 'Rangamati',
        bengali: 'রাঙ্গামাটি',
        upazilas: {
          'Rangamati Sadar': {
            name: 'Rangamati Sadar',
            bengali: 'রাঙ্গামাটি সদর',
            mouzas: [
              { name: 'Tabalchhari', bengali: 'তবলছড়ি', jl: '01', defaultDag: '60', defaultKhatian: '125' },
            ],
          },
        },
      },
    },
  },

  // ==========================================
  // 3. RAJSHAHI DIVISION (৮টি জেলা / 8 Districts)
  // ==========================================
  Rajshahi: {
    name: 'Rajshahi',
    bengali: 'রাজশাহী',
    districts: {
      Rajshahi: {
        name: 'Rajshahi',
        bengali: 'রাজশাহী',
        upazilas: {
          Boalia: {
            name: 'Boalia',
            bengali: 'বোয়ালিয়া',
            mouzas: [
              { name: 'Saheb Bazar', bengali: 'সাহেব বাজার', jl: '02', defaultDag: '88', defaultKhatian: '240' },
              { name: 'Sopura', bengali: 'সোপুরা', jl: '04', defaultDag: '130', defaultKhatian: '310' },
            ],
          },
          Motihar: {
            name: 'Motihar',
            bengali: 'মতিহার',
            mouzas: [
              { name: 'Kazla', bengali: 'কাজলা', jl: '06', defaultDag: '75', defaultKhatian: '180' },
            ],
          },
          Paba: {
            name: 'Paba',
            bengali: 'পবা',
            mouzas: [
              { name: 'Naohata', bengali: 'নওহাটা', jl: '10', defaultDag: '92', defaultKhatian: '205' },
            ],
          },
        },
      },
      Bogra: {
        name: 'Bogra',
        bengali: 'বগুড়া',
        upazilas: {
          'Bogra Sadar': {
            name: 'Bogra Sadar',
            bengali: 'বগুড়া সদর',
            mouzas: [
              { name: 'Sutrapur', bengali: 'সূত্রাপুর', jl: '01', defaultDag: '105', defaultKhatian: '260' },
              { name: 'Chelopara', bengali: 'চেলোপাড়া', jl: '03', defaultDag: '140', defaultKhatian: '320' },
            ],
          },
          Sherpur: {
            name: 'Sherpur',
            bengali: 'শেরপুর',
            mouzas: [
              { name: 'Mirzapur', bengali: 'মির্জাপুর', jl: '08', defaultDag: '65', defaultKhatian: '150' },
            ],
          },
        },
      },
      Joypurhat: {
        name: 'Joypurhat',
        bengali: 'জয়পুরহাট',
        upazilas: {
          'Joypurhat Sadar': {
            name: 'Joypurhat Sadar',
            bengali: 'জয়পুরহাট সদর',
            mouzas: [
              { name: 'Puranapoil', bengali: 'পুরানাপৈল', jl: '03', defaultDag: '80', defaultKhatian: '190' },
            ],
          },
        },
      },
      Naogaon: {
        name: 'Naogaon',
        bengali: 'নওগাঁ',
        upazilas: {
          'Naogaon Sadar': {
            name: 'Naogaon Sadar',
            bengali: 'নওগাঁ সদর',
            mouzas: [
              { name: 'Par-Naogaon', bengali: 'পার-নওগাঁ', jl: '02', defaultDag: '95', defaultKhatian: '215' },
            ],
          },
        },
      },
      Natore: {
        name: 'Natore',
        bengali: 'নাটোর',
        upazilas: {
          'Natore Sadar': {
            name: 'Natore Sadar',
            bengali: 'নাটোর সদর',
            mouzas: [
              { name: 'Kanaikhali', bengali: 'কানাইখালী', jl: '01', defaultDag: '70', defaultKhatian: '170' },
            ],
          },
        },
      },
      Chapainawabganj: {
        name: 'Chapainawabganj',
        bengali: 'চাঁপাইনবাবগঞ্জ',
        upazilas: {
          'Chapainawabganj Sadar': {
            name: 'Chapainawabganj Sadar',
            bengali: 'চাঁপাইনবাবগঞ্জ সদর',
            mouzas: [
              { name: 'Baroghoria', bengali: 'বারঘরিয়া', jl: '04', defaultDag: '85', defaultKhatian: '195' },
            ],
          },
        },
      },
      Pabna: {
        name: 'Pabna',
        bengali: 'পাবনা',
        upazilas: {
          'Pabna Sadar': {
            name: 'Pabna Sadar',
            bengali: 'পাবনা সদর',
            mouzas: [
              { name: 'Radhanagar', bengali: 'রাধানগর', jl: '02', defaultDag: '110', defaultKhatian: '250' },
            ],
          },
          Ishwardi: {
            name: 'Ishwardi',
            bengali: 'ঈশ্বরদী',
            mouzas: [
              { name: 'Paksey', bengali: 'পাকশী', jl: '06', defaultDag: '125', defaultKhatian: '280' },
            ],
          },
        },
      },
      Sirajganj: {
        name: 'Sirajganj',
        bengali: 'সিরাজগঞ্জ',
        upazilas: {
          'Sirajganj Sadar': {
            name: 'Sirajganj Sadar',
            bengali: 'সিরাজগঞ্জ সদর',
            mouzas: [
              { name: 'Dhangora', bengali: 'ধানগড়া', jl: '03', defaultDag: '90', defaultKhatian: '210' },
            ],
          },
          Ullapara: {
            name: 'Ullapara',
            bengali: 'উল্লাপাড়া',
            mouzas: [
              { name: 'Jhikira', bengali: 'ঝিকিড়া', jl: '07', defaultDag: '65', defaultKhatian: '145' },
            ],
          },
        },
      },
    },
  },

  // ==========================================
  // 4. KHULNA DIVISION (১০টি জেলা / 10 Districts)
  // ==========================================
  Khulna: {
    name: 'Khulna',
    bengali: 'খুলনা',
    districts: {
      Khulna: {
        name: 'Khulna',
        bengali: 'খুলনা',
        upazilas: {
          'Khulna Sadar': {
            name: 'Khulna Sadar',
            bengali: 'খুলনা সদর',
            mouzas: [
              { name: 'Tutpara', bengali: 'টুটপাড়া', jl: '01', defaultDag: '105', defaultKhatian: '260' },
              { name: 'Boyra', bengali: 'বয়রা', jl: '03', defaultDag: '140', defaultKhatian: '310' },
            ],
          },
          Sonadanga: {
            name: 'Sonadanga',
            bengali: 'সোনাডাঙ্গা',
            mouzas: [
              { name: 'Choto Boyra', bengali: 'ছোট বয়রা', jl: '05', defaultDag: '90', defaultKhatian: '220' },
            ],
          },
          Dumuria: {
            name: 'Dumuria',
            bengali: 'ডুমুরিয়া',
            mouzas: [
              { name: 'Dumuria Bazar', bengali: 'ডুমুরিয়া বাজার', jl: '11', defaultDag: '70', defaultKhatian: '160' },
            ],
          },
        },
      },
      Bagerhat: {
        name: 'Bagerhat',
        bengali: 'বাগেরহাট',
        upazilas: {
          'Bagerhat Sadar': {
            name: 'Bagerhat Sadar',
            bengali: 'বাগেরহাট সদর',
            mouzas: [
              { name: 'Karapara', bengali: 'কারাপাড়া', jl: '02', defaultDag: '85', defaultKhatian: '190' },
            ],
          },
          Mongla: {
            name: 'Mongla',
            bengali: 'মোংলা',
            mouzas: [
              { name: 'Burirdanga', bengali: 'বুড়িরডাঙ্গা', jl: '08', defaultDag: '110', defaultKhatian: '240' },
            ],
          },
        },
      },
      Chuadanga: {
        name: 'Chuadanga',
        bengali: 'চুয়াডাঙ্গা',
        upazilas: {
          'Chuadanga Sadar': {
            name: 'Chuadanga Sadar',
            bengali: 'চুয়াডাঙ্গা সদর',
            mouzas: [
              { name: 'Gaidghat', bengali: 'গাইডঘাট', jl: '04', defaultDag: '75', defaultKhatian: '175' },
            ],
          },
        },
      },
      Jessore: {
        name: 'Jessore',
        bengali: 'যশোর',
        upazilas: {
          'Jessore Sadar': {
            name: 'Jessore Sadar',
            bengali: 'যশোর সদর',
            mouzas: [
              { name: 'Chanchra', bengali: 'চাঁচড়া', jl: '01', defaultDag: '115', defaultKhatian: '270' },
              { name: 'Ghope', bengali: 'ঘোপ', jl: '02', defaultDag: '135', defaultKhatian: '305' },
            ],
          },
          Jhikargachha: {
            name: 'Jhikargachha',
            bengali: 'ঝিকরগাছা',
            mouzas: [
              { name: 'Gadkhali', bengali: 'গদখালী', jl: '07', defaultDag: '80', defaultKhatian: '180' },
            ],
          },
        },
      },
      Jhenaidah: {
        name: 'Jhenaidah',
        bengali: 'ঝিনাইদহ',
        upazilas: {
          'Jhenaidah Sadar': {
            name: 'Jhenaidah Sadar',
            bengali: 'ঝিনাইদহ সদর',
            mouzas: [
              { name: 'Pabhati', bengali: 'পাবহাটি', jl: '03', defaultDag: '70', defaultKhatian: '165' },
            ],
          },
        },
      },
      Kushtia: {
        name: 'Kushtia',
        bengali: 'কুষ্টিয়া',
        upazilas: {
          'Kushtia Sadar': {
            name: 'Kushtia Sadar',
            bengali: 'কুষ্টিয়া সদর',
            mouzas: [
              { name: 'Milpara', bengali: 'মিলপাড়া', jl: '02', defaultDag: '95', defaultKhatian: '230' },
            ],
          },
          Kumarkhali: {
            name: 'Kumarkhali',
            bengali: 'কুমারখালী',
            mouzas: [
              { name: 'Chechua', bengali: 'চেচুয়া', jl: '05', defaultDag: '60', defaultKhatian: '140' },
            ],
          },
        },
      },
      Magura: {
        name: 'Magura',
        bengali: 'মাগুরা',
        upazilas: {
          'Magura Sadar': {
            name: 'Magura Sadar',
            bengali: 'মাগুরা সদর',
            mouzas: [
              { name: 'Nanduali', bengali: 'নান্দুয়ালী', jl: '01', defaultDag: '65', defaultKhatian: '150' },
            ],
          },
        },
      },
      Meherpur: {
        name: 'Meherpur',
        bengali: 'মেহেরপুর',
        upazilas: {
          'Meherpur Sadar': {
            name: 'Meherpur Sadar',
            bengali: 'মেহেরপুর সদর',
            mouzas: [
              { name: 'Bamonpara', bengali: 'বামনপাড়া', jl: '02', defaultDag: '55', defaultKhatian: '130' },
            ],
          },
        },
      },
      Narail: {
        name: 'Narail',
        bengali: 'নড়াইল',
        upazilas: {
          'Narail Sadar': {
            name: 'Narail Sadar',
            bengali: 'নড়াইল সদর',
            mouzas: [
              { name: 'Rupganj Bazar', bengali: 'রূপগঞ্জ বাজার', jl: '01', defaultDag: '70', defaultKhatian: '160' },
            ],
          },
        },
      },
      Satkhira: {
        name: 'Satkhira',
        bengali: 'সাতক্ষীরা',
        upazilas: {
          'Satkhira Sadar': {
            name: 'Satkhira Sadar',
            bengali: 'সাতক্ষীরা সদর',
            mouzas: [
              { name: 'Katiakhali', bengali: 'কাটিয়াখালী', jl: '04', defaultDag: '85', defaultKhatian: '190' },
            ],
          },
          Shyamnagar: {
            name: 'Shyamnagar',
            bengali: 'শ্যামনগর',
            mouzas: [
              { name: 'Munshiganj', bengali: 'মুন্সীগঞ্জ', jl: '09', defaultDag: '60', defaultKhatian: '135' },
            ],
          },
        },
      },
    },
  },

  // ==========================================
  // 5. BARISAL DIVISION (৬টি জেলা / 6 Districts)
  // ==========================================
  Barisal: {
    name: 'Barisal',
    bengali: 'বরিশাল',
    districts: {
      Barisal: {
        name: 'Barisal',
        bengali: 'বরিশাল',
        upazilas: {
          'Barisal Sadar': {
            name: 'Barisal Sadar',
            bengali: 'বরিশাল সদর',
            mouzas: [
              { name: 'Amanatganj', bengali: 'আমানতগঞ্জ', jl: '01', defaultDag: '90', defaultKhatian: '220' },
              { name: 'Band Road', bengali: 'ব্যান্ড রোড', jl: '02', defaultDag: '120', defaultKhatian: '290' },
            ],
          },
          Gournadi: {
            name: 'Gournadi',
            bengali: 'গৌরনদী',
            mouzas: [
              { name: 'Torkey', bengali: 'টর্কি', jl: '08', defaultDag: '65', defaultKhatian: '150' },
            ],
          },
        },
      },
      Barguna: {
        name: 'Barguna',
        bengali: 'বরগুনা',
        upazilas: {
          'Barguna Sadar': {
            name: 'Barguna Sadar',
            bengali: 'বরগুনা সদর',
            mouzas: [
              { name: 'Krok', bengali: 'ক্রোক', jl: '03', defaultDag: '60', defaultKhatian: '140' },
            ],
          },
          Amtali: {
            name: 'Amtali',
            bengali: 'আমতলী',
            mouzas: [
              { name: 'Chowra', bengali: 'চৌড়া', jl: '06', defaultDag: '50', defaultKhatian: '115' },
            ],
          },
        },
      },
      Bhola: {
        name: 'Bhola',
        bengali: 'ভোলা',
        upazilas: {
          'Bhola Sadar': {
            name: 'Bhola Sadar',
            bengali: 'ভোলা সদর',
            mouzas: [
              { name: 'Ukharia', bengali: 'উখারিয়া', jl: '02', defaultDag: '75', defaultKhatian: '170' },
            ],
          },
          'Char Fasson': {
            name: 'Char Fasson',
            bengali: 'চরফ্যাশন',
            mouzas: [
              { name: 'Dularhat', bengali: 'দুলারহাট', jl: '07', defaultDag: '65', defaultKhatian: '145' },
            ],
          },
        },
      },
      Jhalokati: {
        name: 'Jhalokati',
        bengali: 'ঝালকাঠি',
        upazilas: {
          'Jhalokati Sadar': {
            name: 'Jhalokati Sadar',
            bengali: 'ঝালকাঠি সদর',
            mouzas: [
              { name: 'Basanda', bengali: 'বাসন্ডা', jl: '01', defaultDag: '60', defaultKhatian: '135' },
            ],
          },
        },
      },
      Patuakhali: {
        name: 'Patuakhali',
        bengali: 'পটুয়াখালী',
        upazilas: {
          'Patuakhali Sadar': {
            name: 'Patuakhali Sadar',
            bengali: 'পটুয়াখালী সদর',
            mouzas: [
              { name: 'Laukathi', bengali: 'লৌকাঠি', jl: '02', defaultDag: '80', defaultKhatian: '185' },
            ],
          },
          Kalapara: {
            name: 'Kalapara',
            bengali: 'কলাপাড়া',
            mouzas: [
              { name: 'Kuakata', bengali: 'কুয়াকাটা', jl: '05', defaultDag: '110', defaultKhatian: '250' },
            ],
          },
        },
      },
      Pirojpur: {
        name: 'Pirojpur',
        bengali: 'পিরোজপুর',
        upazilas: {
          'Pirojpur Sadar': {
            name: 'Pirojpur Sadar',
            bengali: 'পিরোজপুর সদর',
            mouzas: [
              { name: 'Hularhat', bengali: 'হুলারহাট', jl: '03', defaultDag: '70', defaultKhatian: '160' },
            ],
          },
          Mathbaria: {
            name: 'Mathbaria',
            bengali: 'মঠবাড়িয়া',
            mouzas: [
              { name: 'Tushkhali', bengali: 'তুষখালী', jl: '06', defaultDag: '55', defaultKhatian: '125' },
            ],
          },
        },
      },
    },
  },

  // ==========================================
  // 6. SYLHET DIVISION (৪টি জেলা / 4 Districts)
  // ==========================================
  Sylhet: {
    name: 'Sylhet',
    bengali: 'সিলেট',
    districts: {
      Sylhet: {
        name: 'Sylhet',
        bengali: 'সিলেট',
        upazilas: {
          'Sylhet Sadar': {
            name: 'Sylhet Sadar',
            bengali: 'সিলেট সদর',
            mouzas: [
              { name: 'Zindabazar', bengali: 'জিন্দাবাজার', jl: '01', defaultDag: '64', defaultKhatian: '190' },
              { name: 'Amberkhana', bengali: 'আম্বরখানা', jl: '02', defaultDag: '112', defaultKhatian: '280' },
              { name: 'Kumarpara', bengali: 'কুমারপাড়া', jl: '03', defaultDag: '85', defaultKhatian: '220' },
            ],
          },
          Beanibazar: {
            name: 'Beanibazar',
            bengali: 'বিয়ানীবাজার',
            mouzas: [
              { name: 'Fatehpur', bengali: 'ফতেহপুর', jl: '08', defaultDag: '55', defaultKhatian: '130' },
            ],
          },
          Golapganj: {
            name: 'Golapganj',
            bengali: 'গোলাপগঞ্জ',
            mouzas: [
              { name: 'Dhaka Dakshin', bengali: 'ঢাকা দক্ষিণ', jl: '11', defaultDag: '70', defaultKhatian: '165' },
            ],
          },
        },
      },
      Habiganj: {
        name: 'Habiganj',
        bengali: 'হবিগঞ্জ',
        upazilas: {
          'Habiganj Sadar': {
            name: 'Habiganj Sadar',
            bengali: 'হবিগঞ্জ সদর',
            mouzas: [
              { name: 'Shayestaganj', bengali: 'শায়েস্তাগঞ্জ', jl: '04', defaultDag: '80', defaultKhatian: '190' },
            ],
          },
          Madhabpur: {
            name: 'Madhabpur',
            bengali: 'মাধবপুর',
            mouzas: [
              { name: 'Noapara', bengali: 'নোয়াপাড়া', jl: '09', defaultDag: '65', defaultKhatian: '145' },
            ],
          },
        },
      },
      Moulvibazar: {
        name: 'Moulvibazar',
        bengali: 'মৌলভীবাজার',
        upazilas: {
          'Moulvibazar Sadar': {
            name: 'Moulvibazar Sadar',
            bengali: 'মৌলভীবাজার সদর',
            mouzas: [
              { name: 'Shamshernagar Road', bengali: 'শমশেরনগর রোড', jl: '02', defaultDag: '75', defaultKhatian: '175' },
            ],
          },
          Sreemangal: {
            name: 'Sreemangal',
            bengali: 'শ্রীমঙ্গল',
            mouzas: [
              { name: 'Kalighat', bengali: 'কালীঘাট', jl: '05', defaultDag: '120', defaultKhatian: '260' },
            ],
          },
        },
      },
      Sunamganj: {
        name: 'Sunamganj',
        bengali: 'সুনামগঞ্জ',
        upazilas: {
          'Sunamganj Sadar': {
            name: 'Sunamganj Sadar',
            bengali: 'সুনামগঞ্জ সদর',
            mouzas: [
              { name: 'Hasonnagar', bengali: 'হাসননগর', jl: '01', defaultDag: '60', defaultKhatian: '140' },
            ],
          },
          Chhatak: {
            name: 'Chhatak',
            bengali: 'ছাতক',
            mouzas: [
              { name: 'Chhatak Cement Area', bengali: 'ছাতক সিমেন্ট এলাকা', jl: '06', defaultDag: '95', defaultKhatian: '215' },
            ],
          },
        },
      },
    },
  },

  // ==========================================
  // 7. RANGPUR DIVISION (৮টি জেলা / 8 Districts)
  // ==========================================
  Rangpur: {
    name: 'Rangpur',
    bengali: 'রংপুর',
    districts: {
      Rangpur: {
        name: 'Rangpur',
        bengali: 'রংপুর',
        upazilas: {
          'Rangpur Sadar': {
            name: 'Rangpur Sadar',
            bengali: 'রংপুর সদর',
            mouzas: [
              { name: 'Dhap', bengali: 'ধাপ', jl: '01', defaultDag: '95', defaultKhatian: '230' },
              { name: 'Mahiganj', bengali: 'মাহিগঞ্জ', jl: '02', defaultDag: '110', defaultKhatian: '260' },
            ],
          },
          Badarganj: {
            name: 'Badarganj',
            bengali: 'বদরগঞ্জ',
            mouzas: [
              { name: 'Gopinathpur', bengali: 'গোপীনাথপুর', jl: '07', defaultDag: '60', defaultKhatian: '140' },
            ],
          },
        },
      },
      Dinajpur: {
        name: 'Dinajpur',
        bengali: 'দিনাজপুর',
        upazilas: {
          'Dinajpur Sadar': {
            name: 'Dinajpur Sadar',
            bengali: 'দিনাজপুর সদর',
            mouzas: [
              { name: 'Balubari', bengali: 'বালুবাড়ী', jl: '02', defaultDag: '85', defaultKhatian: '205' },
              { name: 'Paharpur', bengali: 'পাহাড়পুর', jl: '03', defaultDag: '70', defaultKhatian: '175' },
            ],
          },
          Parbatipur: {
            name: 'Parbatipur',
            bengali: 'পার্বতীপুর',
            mouzas: [
              { name: 'Manmathapur', bengali: 'মন্মথপুর', jl: '06', defaultDag: '90', defaultKhatian: '210' },
            ],
          },
        },
      },
      Gaibandha: {
        name: 'Gaibandha',
        bengali: 'গাইবান্ধা',
        upazilas: {
          'Gaibandha Sadar': {
            name: 'Gaibandha Sadar',
            bengali: 'গাইবান্ধা সদর',
            mouzas: [
              { name: 'Boali', bengali: 'বোয়ালী', jl: '03', defaultDag: '65', defaultKhatian: '150' },
            ],
          },
          Gobindaganj: {
            name: 'Gobindaganj',
            bengali: 'গোবিন্দগঞ্জ',
            mouzas: [
              { name: 'Kamardaha', bengali: 'কামারদহ', jl: '08', defaultDag: '75', defaultKhatian: '170' },
            ],
          },
        },
      },
      Kurigram: {
        name: 'Kurigram',
        bengali: 'কুড়িগ্রাম',
        upazilas: {
          'Kurigram Sadar': {
            name: 'Kurigram Sadar',
            bengali: 'কুড়িগ্রাম সদর',
            mouzas: [
              { name: 'Kholashan', bengali: 'খোলাশান', jl: '01', defaultDag: '55', defaultKhatian: '130' },
            ],
          },
        },
      },
      Lalmonirhat: {
        name: 'Lalmonirhat',
        bengali: 'লালমনিরহাট',
        upazilas: {
          'Lalmonirhat Sadar': {
            name: 'Lalmonirhat Sadar',
            bengali: 'লালমনিরহাট সদর',
            mouzas: [
              { name: 'Mogholhat', bengali: 'মোঘলহাট', jl: '02', defaultDag: '60', defaultKhatian: '140' },
            ],
          },
        },
      },
      Nilphamari: {
        name: 'Nilphamari',
        bengali: 'নীলফামারী',
        upazilas: {
          'Nilphamari Sadar': {
            name: 'Nilphamari Sadar',
            bengali: 'নীলফামারী সদর',
            mouzas: [
              { name: 'Baroghoria', bengali: 'বারঘরিয়া', jl: '03', defaultDag: '70', defaultKhatian: '165' },
            ],
          },
          Saidpur: {
            name: 'Saidpur',
            bengali: 'সৈয়দপুর',
            mouzas: [
              { name: 'Kundal', bengali: 'কুন্দল', jl: '06', defaultDag: '95', defaultKhatian: '220' },
            ],
          },
        },
      },
      Panchagarh: {
        name: 'Panchagarh',
        bengali: 'পঞ্চগড়',
        upazilas: {
          'Panchagarh Sadar': {
            name: 'Panchagarh Sadar',
            bengali: 'পঞ্চগড় সদর',
            mouzas: [
              { name: 'Dhapukari', bengali: 'ধাপুকারী', jl: '01', defaultDag: '50', defaultKhatian: '120' },
            ],
          },
          Tetulia: {
            name: 'Tetulia',
            bengali: 'তেঁতুলিয়া',
            mouzas: [
              { name: 'Banglabandha', bengali: 'বাংলাবান্ধা', jl: '05', defaultDag: '80', defaultKhatian: '190' },
            ],
          },
        },
      },
      Thakurgaon: {
        name: 'Thakurgaon',
        bengali: 'ঠাকুরগাঁও',
        upazilas: {
          'Thakurgaon Sadar': {
            name: 'Thakurgaon Sadar',
            bengali: 'ঠাকুরগাঁও সদর',
            mouzas: [
              { name: 'Gobrapara', bengali: 'গোবরাপাড়া', jl: '02', defaultDag: '65', defaultKhatian: '155' },
            ],
          },
        },
      },
    },
  },

  // ==========================================
  // 8. MYMENSINGH DIVISION (৪টি জেলা / 4 Districts)
  // ==========================================
  Mymensingh: {
    name: 'Mymensingh',
    bengali: 'ময়মনসিংহ',
    districts: {
      Mymensingh: {
        name: 'Mymensingh',
        bengali: 'ময়মনসিংহ',
        upazilas: {
          'Mymensingh Sadar': {
            name: 'Mymensingh Sadar',
            bengali: 'ময়মনসিংহ সদর',
            mouzas: [
              { name: 'Maskanda', bengali: 'মাসকান্দা', jl: '01', defaultDag: '110', defaultKhatian: '270' },
              { name: 'Akua', bengali: 'আকুয়া', jl: '02', defaultDag: '90', defaultKhatian: '220' },
            ],
          },
          Trishal: {
            name: 'Trishal',
            bengali: 'ত্রিশাল',
            mouzas: [
              { name: 'Dapunia', bengali: 'দাপুনিয়া', jl: '05', defaultDag: '75', defaultKhatian: '175' },
            ],
          },
          Bhaluka: {
            name: 'Bhaluka',
            bengali: 'ভালুকা',
            mouzas: [
              { name: 'Habirbari', bengali: 'হবিরবাড়ী', jl: '09', defaultDag: '130', defaultKhatian: '290' },
            ],
          },
        },
      },
      Jamalpur: {
        name: 'Jamalpur',
        bengali: 'জামালপুর',
        upazilas: {
          'Jamalpur Sadar': {
            name: 'Jamalpur Sadar',
            bengali: 'জামালপুর সদর',
            mouzas: [
              { name: 'Singhajani', bengali: 'সিংহজানী', jl: '03', defaultDag: '85', defaultKhatian: '200' },
            ],
          },
          Sarishabari: {
            name: 'Sarishabari',
            bengali: 'সরিষাবাড়ী',
            mouzas: [
              { name: 'Aramnagar', bengali: 'আরামনগর', jl: '07', defaultDag: '65', defaultKhatian: '150' },
            ],
          },
        },
      },
      Netrokona: {
        name: 'Netrokona',
        bengali: 'নেত্রকোণা',
        upazilas: {
          'Netrokona Sadar': {
            name: 'Netrokona Sadar',
            bengali: 'নেত্রকোণা সদর',
            mouzas: [
              { name: 'Bishiura', bengali: 'বিশিউরা', jl: '02', defaultDag: '70', defaultKhatian: '165' },
            ],
          },
          Durgapur: {
            name: 'Durgapur',
            bengali: 'দুর্গাপুর',
            mouzas: [
              { name: 'Birishiri', bengali: 'বিরিশিরি', jl: '06', defaultDag: '60', defaultKhatian: '140' },
            ],
          },
        },
      },
      Sherpur: {
        name: 'Sherpur',
        bengali: 'শেরপুর',
        upazilas: {
          'Sherpur Sadar': {
            name: 'Sherpur Sadar',
            bengali: 'শেরপুর সদর',
            mouzas: [
              { name: 'Nabinagar', bengali: 'নবীনগর', jl: '01', defaultDag: '65', defaultKhatian: '155' },
            ],
          },
          Nalitabari: {
            name: 'Nalitabari',
            bengali: 'নালিতাবাড়ী',
            mouzas: [
              { name: 'Baromari', bengali: 'বারোমারী', jl: '05', defaultDag: '50', defaultKhatian: '120' },
            ],
          },
        },
      },
    },
  },
};

/**
 * Total Division & District Constants
 */
export const TOTAL_DIVISIONS_COUNT = Object.keys(BANGLADESH_GEO_DATA).length;

export const TOTAL_DISTRICTS_COUNT = Object.values(BANGLADESH_GEO_DATA).reduce(
  (acc, div) => acc + Object.keys(div.districts).length,
  0
);

/**
 * Returns flat list of all 64 districts in Bangladesh
 */
export function getAllDistrictsList(): { name: string; bengali: string; division: string; divisionBn: string }[] {
  const result: { name: string; bengali: string; division: string; divisionBn: string }[] = [];
  for (const [divKey, div] of Object.entries(BANGLADESH_GEO_DATA)) {
    for (const [distKey, dist] of Object.entries(div.districts)) {
      result.push({
        name: distKey,
        bengali: dist.bengali,
        division: divKey,
        divisionBn: div.bengali,
      });
    }
  }
  return result;
}

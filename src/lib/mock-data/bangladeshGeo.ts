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

export const BANGLADESH_GEO_DATA: Record<string, DivisionInfo> = {
  Dhaka: {
    name: 'Dhaka',
    bengali: 'ঢাকা',
    districts: {
      Dhaka: {
        name: 'Dhaka',
        bengali: 'ঢাকা',
        upazilas: {
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
          Gulshan: {
            name: 'Gulshan',
            bengali: 'গুলশান',
            mouzas: [
              { name: 'Gulshan', bengali: 'গুলশান', jl: '05', defaultDag: '85', defaultKhatian: '991' },
              { name: 'Banani', bengali: 'বনানী', jl: '06', defaultDag: '142', defaultKhatian: '810' },
              { name: 'Baridhara', bengali: 'বারিধারা', jl: '07', defaultDag: '93', defaultKhatian: '725' },
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
          Mirpur: {
            name: 'Mirpur',
            bengali: 'মিরপুর',
            mouzas: [
              { name: 'Senpara Parbata', bengali: 'সেনপাড়া পর্বতা', jl: '18', defaultDag: '304', defaultKhatian: '580' },
              { name: 'Paikpara', bengali: 'পাইকপাড়া', jl: '19', defaultDag: '155', defaultKhatian: '390' },
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
        },
      },
    },
  },
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
            ],
          },
          Panchlaish: {
            name: 'Panchlaish',
            bengali: 'পাঁচলাইশ',
            mouzas: [
              { name: 'Nasirabad', bengali: 'নাসিরাবাদ', jl: '03', defaultDag: '210', defaultKhatian: '540' },
            ],
          },
        },
      },
    },
  },
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
            ],
          },
        },
      },
    },
  },
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
            ],
          },
        },
      },
    },
  },
};

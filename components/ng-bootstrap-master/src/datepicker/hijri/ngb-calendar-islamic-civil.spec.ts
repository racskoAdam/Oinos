import { NgbCalendarIslamicCivil } from './ngb-calendar-islamic-civil';
import { NgbDate } from '../ngb-date';

describe('ngb-calendar-islamic-civil', () => {
	const DATE_TABLE = [
		[1420, 1, 1, 1999, 3, 17],
		[1420, 1, 12, 1999, 3, 28],
		[1420, 1, 23, 1999, 4, 9],
		[1420, 2, 4, 1999, 4, 20],
		[1420, 2, 15, 1999, 4, 31],
		[1420, 2, 26, 1999, 5, 11],
		[1420, 3, 8, 1999, 5, 22],
		[1420, 3, 19, 1999, 6, 3],
		[1420, 3, 30, 1999, 6, 14],
		[1420, 4, 11, 1999, 6, 25],
		[1420, 4, 22, 1999, 7, 5],
		[1420, 5, 4, 1999, 7, 16],
		[1420, 5, 15, 1999, 7, 27],
		[1420, 5, 26, 1999, 8, 7],
		[1420, 6, 7, 1999, 8, 18],
		[1420, 6, 18, 1999, 8, 29],
		[1420, 6, 29, 1999, 9, 10],
		[1420, 7, 11, 1999, 9, 21],
		[1420, 7, 22, 1999, 10, 1],
		[1420, 8, 3, 1999, 10, 12],
		[1420, 8, 14, 1999, 10, 23],
		[1420, 9, 29, 2000, 0, 6],
		[1420, 10, 10, 2000, 0, 17],
		[1420, 10, 21, 2000, 0, 28],
		[1420, 11, 3, 2000, 1, 8],
		[1420, 11, 14, 2000, 1, 19],
		[1420, 11, 25, 2000, 2, 1],
		[1420, 12, 6, 2000, 2, 12],
		[1420, 12, 17, 2000, 2, 23],
		[1420, 12, 28, 2000, 3, 3],
		[1421, 1, 9, 2000, 3, 14],
		[1421, 1, 20, 2000, 3, 25],
		[1421, 2, 1, 2000, 4, 6],
		[1421, 2, 12, 2000, 4, 17],
		[1421, 2, 23, 2000, 4, 28],
		[1421, 3, 5, 2000, 5, 8],
		[1421, 3, 16, 2000, 5, 19],
		[1421, 3, 27, 2000, 5, 30],
		[1421, 4, 8, 2000, 6, 11],
		[1421, 4, 19, 2000, 6, 22],
		[1421, 5, 1, 2000, 7, 2],
		[1421, 5, 12, 2000, 7, 13],
		[1421, 5, 23, 2000, 7, 24],
		[1421, 6, 4, 2000, 8, 4],
		[1421, 6, 15, 2000, 8, 15],
		[1421, 6, 26, 2000, 8, 26],
		[1421, 7, 8, 2000, 9, 7],
		[1421, 7, 19, 2000, 9, 18],
		[1421, 7, 30, 2000, 9, 29],
		[1421, 8, 11, 2000, 10, 9],
		[1421, 8, 22, 2000, 10, 20],
		[1421, 10, 7, 2001, 0, 3],
		[1421, 10, 18, 2001, 0, 14],
		[1421, 10, 7, 2001, 0, 3],
		[1421, 10, 18, 2001, 0, 14],
		[1421, 10, 29, 2001, 0, 25],
		[1421, 11, 11, 2001, 1, 5],
		[1421, 11, 22, 2001, 1, 16],
		[1421, 12, 3, 2001, 1, 27],
		[1421, 12, 14, 2001, 2, 10],
		[1421, 12, 25, 2001, 2, 21],
		[1422, 1, 7, 2001, 3, 1],
		[1422, 1, 18, 2001, 3, 12],
		[1422, 1, 29, 2001, 3, 23],
		[1422, 2, 10, 2001, 4, 4],
		[1422, 2, 21, 2001, 4, 15],
		[1422, 3, 3, 2001, 4, 26],
		[1422, 3, 14, 2001, 5, 6],
		[1422, 3, 25, 2001, 5, 17],
		[1422, 4, 6, 2001, 5, 28],
		[1422, 4, 17, 2001, 6, 9],
		[1422, 4, 28, 2001, 6, 20],
		[1422, 5, 10, 2001, 6, 31],
		[1422, 5, 21, 2001, 7, 11],
		[1422, 6, 2, 2001, 7, 22],
		[1422, 6, 13, 2001, 8, 2],
		[1422, 6, 24, 2001, 8, 13],
		[1422, 7, 6, 2001, 8, 24],
		[1422, 7, 17, 2001, 9, 5],
		[1422, 7, 28, 2001, 9, 16],
		[1422, 8, 9, 2001, 9, 27],
		[1422, 8, 20, 2001, 10, 7],
		[1422, 9, 2, 2001, 10, 18],
		[1422, 9, 13, 2001, 10, 29],
		[1422, 9, 24, 2001, 11, 10],
		[1422, 10, 5, 2001, 11, 21],
		[1422, 10, 16, 2002, 0, 1],
		[1422, 10, 27, 2002, 0, 12],
		[1422, 11, 9, 2002, 0, 23],
		[1422, 11, 20, 2002, 1, 3],
		[1422, 12, 1, 2002, 1, 14],
		[1422, 12, 12, 2002, 1, 25],
		[1422, 12, 23, 2002, 2, 8],
		[1423, 1, 5, 2002, 2, 19],
		[1423, 1, 16, 2002, 2, 30],
		[1423, 1, 27, 2002, 3, 10],
		[1423, 2, 8, 2002, 3, 21],
		[1423, 2, 19, 2002, 4, 2],
		[1423, 3, 1, 2002, 4, 13],
		[1423, 3, 12, 2002, 4, 24],
		[1423, 3, 23, 2002, 5, 4],
		[1423, 4, 4, 2002, 5, 15],
		[1423, 4, 15, 2002, 5, 26],
		[1423, 4, 26, 2002, 6, 7],
		[1423, 5, 8, 2002, 6, 18],
		[1423, 5, 19, 2002, 6, 29],
		[1423, 5, 30, 2002, 7, 9],
		[1423, 6, 11, 2002, 7, 20],
		[1423, 6, 22, 2002, 7, 31],
		[1423, 7, 4, 2002, 8, 11],
		[1423, 7, 15, 2002, 8, 22],
		[1423, 7, 26, 2002, 9, 3],
		[1423, 8, 7, 2002, 9, 14],
		[1423, 8, 18, 2002, 9, 25],
		[1423, 8, 29, 2002, 10, 5],
		[1423, 9, 11, 2002, 10, 16],
		[1423, 9, 22, 2002, 10, 27],
		[1423, 10, 3, 2002, 11, 8],
		[1423, 10, 14, 2002, 11, 19],
		[1423, 10, 25, 2002, 11, 30],
		[1423, 11, 7, 2003, 0, 10],
		[1423, 11, 18, 2003, 0, 21],
		[1423, 11, 29, 2003, 1, 1],
		[1423, 12, 10, 2003, 1, 12],
		[1423, 12, 21, 2003, 1, 23],
		[1424, 1, 2, 2003, 2, 6],
		[1424, 1, 13, 2003, 2, 17],
		[1424, 1, 24, 2003, 2, 28],
		[1424, 2, 5, 2003, 3, 8],
		[1424, 2, 16, 2003, 3, 19],
		[1424, 2, 27, 2003, 3, 30],
		[1424, 3, 9, 2003, 4, 11],
		[1424, 3, 20, 2003, 4, 22],
		[1424, 4, 1, 2003, 5, 2],
		[1424, 4, 12, 2003, 5, 13],
		[1424, 4, 23, 2003, 5, 24],
		[1424, 5, 5, 2003, 6, 5],
		[1424, 5, 16, 2003, 6, 16],
		[1424, 5, 27, 2003, 6, 27],
		[1424, 6, 8, 2003, 7, 7],
		[1424, 6, 19, 2003, 7, 18],
		[1424, 7, 1, 2003, 7, 29],
		[1424, 7, 12, 2003, 8, 9],
		[1424, 7, 23, 2003, 8, 20],
		[1424, 8, 4, 2003, 9, 1],
		[1424, 8, 15, 2003, 9, 12],
		[1424, 8, 26, 2003, 9, 23],
		[1424, 9, 8, 2003, 10, 3],
		[1424, 9, 19, 2003, 10, 14],
		[1424, 9, 30, 2003, 10, 25],
		[1424, 11, 15, 2004, 0, 8],
		[1424, 11, 26, 2004, 0, 19],
		[1424, 12, 7, 2004, 0, 30],
		[1424, 12, 18, 2004, 1, 10],
		[1424, 12, 29, 2004, 1, 21],
		[1425, 1, 11, 2004, 2, 3],
		[1425, 1, 22, 2004, 2, 14],
		[1425, 2, 3, 2004, 2, 25],
		[1425, 2, 14, 2004, 3, 5],
		[1425, 2, 25, 2004, 3, 16],
		[1425, 3, 7, 2004, 3, 27],
		[1425, 3, 18, 2004, 4, 8],
		[1425, 3, 29, 2004, 4, 19],
		[1425, 4, 10, 2004, 4, 30],
		[1425, 4, 21, 2004, 5, 10],
		[1425, 5, 3, 2004, 5, 21],
		[1425, 5, 14, 2004, 6, 2],
		[1425, 5, 25, 2004, 6, 13],
		[1425, 6, 6, 2004, 6, 24],
		[1425, 6, 17, 2004, 7, 4],
		[1425, 6, 28, 2004, 7, 15],
		[1425, 7, 10, 2004, 7, 26],
		[1425, 7, 21, 2004, 8, 6],
		[1425, 8, 2, 2004, 8, 17],
		[1425, 8, 13, 2004, 8, 28],
		[1425, 8, 24, 2004, 9, 9],
		[1425, 9, 6, 2004, 9, 20],
		[1425, 9, 17, 2004, 9, 31],
		[1425, 9, 28, 2004, 10, 11],
		[1425, 10, 9, 2004, 10, 22],
		[1425, 11, 24, 2005, 0, 5],
		[1425, 12, 5, 2005, 0, 16],
		[1425, 12, 16, 2005, 0, 27],
		[1425, 12, 27, 2005, 1, 7],
		[1426, 1, 9, 2005, 1, 18],
		[1426, 1, 20, 2005, 2, 1],
		[1426, 2, 1, 2005, 2, 12],
		[1426, 2, 12, 2005, 2, 23],
		[1426, 2, 23, 2005, 3, 3],
		[1426, 3, 5, 2005, 3, 14],
		[1426, 3, 16, 2005, 3, 25],
		[1426, 3, 27, 2005, 4, 6],
		[1426, 4, 8, 2005, 4, 17],
		[1426, 4, 19, 2005, 4, 28],
		[1426, 5, 1, 2005, 5, 8],
		[1426, 5, 12, 2005, 5, 19],
		[1426, 5, 23, 2005, 5, 30],
		[1426, 6, 4, 2005, 6, 11],
		[1426, 6, 15, 2005, 6, 22],
		[1426, 6, 26, 2005, 7, 2],
		[1426, 7, 8, 2005, 7, 13],
		[1426, 7, 19, 2005, 7, 24],
		[1426, 7, 30, 2005, 8, 4],
		[1426, 8, 11, 2005, 8, 15],
		[1426, 8, 22, 2005, 8, 26],
		[1426, 9, 4, 2005, 9, 7],
		[1426, 9, 15, 2005, 9, 18],
		[1426, 9, 26, 2005, 9, 29],
		[1426, 10, 7, 2005, 10, 9],
		[1426, 10, 18, 2005, 10, 20],
		[1426, 10, 29, 2005, 11, 1],
		[1426, 11, 11, 2005, 11, 12],
		[1426, 11, 22, 2005, 11, 23],
		[1426, 12, 3, 2006, 0, 3],
		[1426, 12, 14, 2006, 0, 14],
		[1426, 12, 25, 2006, 0, 25],
		[1427, 1, 6, 2006, 1, 5],
		[1427, 1, 17, 2006, 1, 16],
		[1427, 1, 28, 2006, 1, 27],
		[1427, 2, 9, 2006, 2, 10],
		[1427, 2, 20, 2006, 2, 21],
		[1427, 3, 2, 2006, 3, 1],
		[1427, 3, 13, 2006, 3, 12],
		[1427, 3, 24, 2006, 3, 23],
		[1427, 4, 5, 2006, 4, 4],
		[1427, 4, 16, 2006, 4, 15],
		[1427, 4, 27, 2006, 4, 26],
		[1427, 5, 9, 2006, 5, 6],
		[1427, 5, 20, 2006, 5, 17],
		[1427, 6, 1, 2006, 5, 28],
		[1427, 6, 12, 2006, 6, 9],
		[1427, 6, 23, 2006, 6, 20],
		[1427, 7, 5, 2006, 6, 31],
		[1427, 7, 16, 2006, 7, 11],
		[1427, 7, 27, 2006, 7, 22],
		[1427, 8, 8, 2006, 8, 2],
		[1427, 8, 19, 2006, 8, 13],
		[1427, 9, 1, 2006, 8, 24],
		[1427, 9, 12, 2006, 9, 5],
		[1427, 9, 23, 2006, 9, 16],
		[1427, 10, 4, 2006, 9, 27],
		[1427, 10, 15, 2006, 10, 7],
		[1427, 10, 26, 2006, 10, 18],
		[1427, 11, 8, 2006, 10, 29],
		[1427, 11, 19, 2006, 11, 10],
		[1427, 11, 30, 2006, 11, 21],
		[1427, 12, 11, 2007, 0, 1],
		[1427, 12, 22, 2007, 0, 12],
		[1428, 1, 4, 2007, 0, 23],
		[1428, 1, 15, 2007, 1, 3],
		[1428, 1, 26, 2007, 1, 14],
		[1428, 2, 7, 2007, 1, 25],
		[1428, 2, 18, 2007, 2, 8],
		[1428, 2, 29, 2007, 2, 19],
		[1428, 3, 11, 2007, 2, 30],
		[1428, 3, 22, 2007, 3, 10],
		[1428, 4, 3, 2007, 3, 21],
		[1428, 4, 14, 2007, 4, 2],
		[1428, 4, 25, 2007, 4, 13],
		[1428, 5, 7, 2007, 4, 24],
		[1428, 5, 18, 2007, 5, 4],
		[1428, 5, 29, 2007, 5, 15],
		[1428, 6, 10, 2007, 5, 26],
		[1428, 6, 21, 2007, 6, 7],
		[1428, 7, 3, 2007, 6, 18],
		[1428, 7, 14, 2007, 6, 29],
		[1428, 7, 25, 2007, 7, 9],
		[1428, 8, 6, 2007, 7, 20],
		[1428, 8, 17, 2007, 7, 31],
		[1428, 8, 28, 2007, 8, 11],
		[1428, 9, 10, 2007, 8, 22],
		[1428, 9, 21, 2007, 9, 3],
		[1428, 10, 2, 2007, 9, 14],
		[1428, 10, 13, 2007, 9, 25],
		[1428, 10, 24, 2007, 10, 5],
		[1428, 11, 6, 2007, 10, 16],
		[1428, 11, 17, 2007, 10, 27],
		[1429, 1, 1, 2008, 0, 10],
		[1429, 1, 12, 2008, 0, 21],
		[1429, 1, 23, 2008, 1, 1],
		[1429, 2, 4, 2008, 1, 12],
		[1429, 2, 15, 2008, 1, 23],
		[1429, 2, 26, 2008, 2, 5],
		[1429, 3, 8, 2008, 2, 16],
		[1429, 3, 19, 2008, 2, 27],
		[1429, 3, 30, 2008, 3, 7],
		[1429, 4, 11, 2008, 3, 18],
		[1429, 4, 22, 2008, 3, 29],
		[1429, 5, 4, 2008, 4, 10],
		[1429, 5, 15, 2008, 4, 21],
		[1429, 5, 26, 2008, 5, 1],
		[1429, 6, 7, 2008, 5, 12],
		[1429, 6, 18, 2008, 5, 23],
		[1429, 6, 29, 2008, 6, 4],
		[1429, 7, 11, 2008, 6, 15],
		[1429, 7, 22, 2008, 6, 26],
		[1429, 8, 3, 2008, 7, 6],
		[1429, 8, 14, 2008, 7, 17],
		[1429, 8, 25, 2008, 7, 28],
		[1429, 9, 7, 2008, 8, 8],
		[1429, 9, 18, 2008, 8, 19],
		[1429, 9, 29, 2008, 8, 30],
		[1429, 10, 10, 2008, 9, 11],
		[1429, 10, 21, 2008, 9, 22],
		[1429, 11, 3, 2008, 10, 2],
		[1429, 11, 14, 2008, 10, 13],
		[1429, 11, 25, 2008, 10, 24],
		[1430, 1, 10, 2009, 0, 7],
		[1430, 1, 21, 2009, 0, 18],
		[1430, 2, 2, 2009, 0, 29],
		[1430, 2, 13, 2009, 1, 9],
		[1430, 2, 24, 2009, 1, 20],
		[1430, 3, 6, 2009, 2, 3],
		[1430, 3, 17, 2009, 2, 14],
		[1430, 3, 28, 2009, 2, 25],
		[1430, 4, 9, 2009, 3, 5],
		[1430, 4, 20, 2009, 3, 16],
		[1430, 5, 2, 2009, 3, 27],
		[1430, 5, 13, 2009, 4, 8],
		[1430, 5, 24, 2009, 4, 19],
		[1430, 6, 5, 2009, 4, 30],
		[1430, 6, 16, 2009, 5, 10],
		[1430, 6, 27, 2009, 5, 21],
		[1430, 7, 9, 2009, 6, 2],
		[1430, 7, 20, 2009, 6, 13],
		[1430, 8, 1, 2009, 6, 24],
		[1430, 8, 12, 2009, 7, 4],
		[1430, 8, 23, 2009, 7, 15],
		[1430, 9, 5, 2009, 7, 26],
		[1430, 9, 16, 2009, 8, 6],
		[1430, 9, 27, 2009, 8, 17],
		[1430, 10, 8, 2009, 8, 28],
		[1430, 10, 19, 2009, 9, 9],
		[1430, 11, 1, 2009, 9, 20],
		[1430, 11, 12, 2009, 9, 31],
		[1430, 11, 23, 2009, 10, 11],
		[1430, 12, 4, 2009, 10, 22],
		[1430, 12, 15, 2009, 11, 3],
		[1430, 12, 26, 2009, 11, 14],
		[1431, 1, 8, 2009, 11, 25],
		[1431, 1, 19, 2010, 0, 5],
		[1431, 1, 30, 2010, 0, 16],
		[1431, 2, 11, 2010, 0, 27],
		[1431, 2, 22, 2010, 1, 7],
		[1431, 3, 4, 2010, 1, 18],
		[1431, 3, 15, 2010, 2, 1],
		[1431, 3, 26, 2010, 2, 12],
		[1431, 4, 7, 2010, 2, 23],
		[1431, 4, 18, 2010, 3, 3],
		[1431, 4, 29, 2010, 3, 14],
		[1431, 5, 11, 2010, 3, 25],
		[1431, 5, 22, 2010, 4, 6],
		[1431, 6, 3, 2010, 4, 17],
		[1431, 6, 14, 2010, 4, 28],
		[1431, 6, 25, 2010, 5, 8],
		[1431, 7, 7, 2010, 5, 19],
		[1431, 7, 18, 2010, 5, 30],
		[1431, 7, 29, 2010, 6, 11],
		[1431, 8, 10, 2010, 6, 22],
		[1431, 8, 21, 2010, 7, 2],
		[1431, 9, 3, 2010, 7, 13],
		[1431, 9, 14, 2010, 7, 24],
		[1431, 9, 25, 2010, 8, 4],
		[1431, 10, 6, 2010, 8, 15],
		[1431, 10, 17, 2010, 8, 26],
		[1431, 10, 28, 2010, 9, 7],
		[1431, 11, 10, 2010, 9, 18],
		[1431, 11, 21, 2010, 9, 29],
		[1431, 12, 2, 2010, 10, 9],
		[1431, 12, 13, 2010, 10, 20],
		[1431, 12, 24, 2010, 11, 1],
		[1432, 1, 5, 2010, 11, 12],
		[1432, 1, 16, 2010, 11, 23],
		[1432, 1, 27, 2011, 0, 3],
		[1432, 2, 8, 2011, 0, 14],
		[1432, 2, 19, 2011, 0, 25],
		[1432, 3, 1, 2011, 1, 5],
		[1432, 3, 12, 2011, 1, 16],
		[1432, 3, 23, 2011, 1, 27],
		[1432, 4, 4, 2011, 2, 10],
		[1432, 4, 15, 2011, 2, 21],
		[1432, 4, 26, 2011, 3, 1],
		[1432, 5, 8, 2011, 3, 12],
		[1432, 5, 19, 2011, 3, 23],
		[1432, 5, 30, 2011, 4, 4],
		[1432, 6, 11, 2011, 4, 15],
		[1432, 6, 22, 2011, 4, 26],
		[1432, 7, 4, 2011, 5, 6],
		[1432, 7, 15, 2011, 5, 17],
		[1432, 7, 26, 2011, 5, 28],
		[1432, 8, 7, 2011, 6, 9],
		[1432, 8, 18, 2011, 6, 20],
		[1432, 8, 29, 2011, 6, 31],
		[1432, 9, 11, 2011, 7, 11],
		[1432, 9, 22, 2011, 7, 22],
		[1432, 10, 3, 2011, 8, 2],
		[1432, 10, 14, 2011, 8, 13],
		[1432, 10, 25, 2011, 8, 24],
		[1432, 11, 7, 2011, 9, 5],
		[1432, 11, 18, 2011, 9, 16],
		[1432, 11, 29, 2011, 9, 27],
		[1432, 12, 10, 2011, 10, 7],
		[1432, 12, 21, 2011, 10, 18],
		[1433, 1, 3, 2011, 10, 29],
		[1433, 2, 6, 2012, 0, 1],
		[1433, 2, 17, 2012, 0, 12],
		[1433, 2, 28, 2012, 0, 23],
		[1433, 3, 10, 2012, 1, 3],
		[1433, 3, 21, 2012, 1, 14],
		[1433, 4, 2, 2012, 1, 25],
		[1433, 4, 13, 2012, 2, 7],
		[1433, 4, 24, 2012, 2, 18],
		[1433, 5, 6, 2012, 2, 29],
		[1433, 5, 17, 2012, 3, 9],
		[1433, 5, 28, 2012, 3, 20],
		[1433, 6, 9, 2012, 4, 1],
		[1433, 6, 20, 2012, 4, 12],
		[1433, 7, 2, 2012, 4, 23],
		[1433, 7, 13, 2012, 5, 3],
		[1433, 7, 24, 2012, 5, 14],
		[1433, 8, 5, 2012, 5, 25],
		[1433, 8, 16, 2012, 6, 6],
		[1433, 8, 27, 2012, 6, 17],
		[1433, 9, 9, 2012, 6, 28],
		[1433, 9, 20, 2012, 7, 8],
		[1433, 10, 1, 2012, 7, 19],
		[1433, 10, 12, 2012, 7, 30],
		[1433, 10, 23, 2012, 8, 10],
		[1433, 11, 5, 2012, 8, 21],
		[1433, 11, 16, 2012, 9, 2],
		[1433, 11, 27, 2012, 9, 13],
		[1433, 12, 8, 2012, 9, 24],
		[1433, 12, 19, 2012, 10, 4],
		[1434, 1, 1, 2012, 10, 15],
		[1434, 1, 12, 2012, 10, 26],
		[1434, 2, 26, 2013, 0, 9],
		[1434, 3, 8, 2013, 0, 20],
		[1434, 3, 19, 2013, 0, 31],
		[1434, 3, 30, 2013, 1, 11],
		[1434, 4, 11, 2013, 1, 22],
		[1434, 4, 22, 2013, 2, 5],
		[1434, 5, 4, 2013, 2, 16],
		[1434, 5, 15, 2013, 2, 27],
		[1434, 5, 26, 2013, 3, 7],
		[1434, 6, 7, 2013, 3, 18],
		[1434, 6, 18, 2013, 3, 29],
		[1434, 6, 29, 2013, 4, 10],
		[1434, 7, 11, 2013, 4, 21],
		[1434, 7, 22, 2013, 5, 1],
		[1434, 8, 3, 2013, 5, 12],
		[1434, 8, 14, 2013, 5, 23],
		[1434, 8, 25, 2013, 6, 4],
		[1434, 9, 7, 2013, 6, 15],
		[1434, 9, 18, 2013, 6, 26],
		[1434, 9, 29, 2013, 7, 6],
		[1434, 10, 10, 2013, 7, 17],
		[1434, 10, 21, 2013, 7, 28],
		[1434, 11, 3, 2013, 8, 8],
		[1434, 11, 14, 2013, 8, 19],
		[1434, 11, 25, 2013, 8, 30],
		[1434, 12, 6, 2013, 9, 11],
		[1434, 12, 17, 2013, 9, 22],
		[1434, 12, 28, 2013, 10, 2],
		[1435, 1, 9, 2013, 10, 13],
		[1435, 1, 20, 2013, 10, 24],
		[1435, 2, 1, 2013, 11, 5],
		[1435, 2, 12, 2013, 11, 16],
		[1435, 2, 23, 2013, 11, 27],
		[1435, 3, 5, 2014, 0, 7],
		[1435, 3, 16, 2014, 0, 18],
		[1435, 3, 27, 2014, 0, 29],
		[1435, 4, 8, 2014, 1, 9],
		[1435, 4, 19, 2014, 1, 20],
		[1435, 5, 1, 2014, 2, 3],
		[1435, 5, 12, 2014, 2, 14],
		[1435, 5, 23, 2014, 2, 25],
		[1435, 6, 4, 2014, 3, 5],
		[1435, 6, 15, 2014, 3, 16],
		[1435, 6, 26, 2014, 3, 27],
		[1435, 7, 8, 2014, 4, 8],
		[1435, 7, 19, 2014, 4, 19],
		[1435, 7, 30, 2014, 4, 30],
		[1435, 8, 11, 2014, 5, 10],
		[1435, 8, 22, 2014, 5, 21],
		[1435, 9, 4, 2014, 6, 2],
		[1435, 9, 15, 2014, 6, 13],
		[1435, 9, 26, 2014, 6, 24],
		[1435, 10, 7, 2014, 7, 4],
		[1435, 10, 18, 2014, 7, 15],
		[1435, 10, 29, 2014, 7, 26],
		[1435, 11, 11, 2014, 8, 6],
		[1435, 11, 22, 2014, 8, 17],
		[1435, 12, 3, 2014, 8, 28],
		[1435, 12, 14, 2014, 9, 9],
		[1435, 12, 25, 2014, 9, 20],
		[1436, 1, 7, 2014, 9, 31],
		[1436, 1, 18, 2014, 10, 11],
		[1436, 1, 29, 2014, 10, 22],
		[1436, 2, 10, 2014, 11, 3],
		[1436, 2, 21, 2014, 11, 14],
		[1436, 3, 3, 2014, 11, 25],
		[1436, 3, 14, 2015, 0, 5],
		[1436, 3, 25, 2015, 0, 16],
		[1436, 4, 6, 2015, 0, 27],
		[1436, 4, 17, 2015, 1, 7],
		[1436, 4, 28, 2015, 1, 18],
		[1436, 5, 10, 2015, 2, 1],
		[1436, 5, 21, 2015, 2, 12],
		[1436, 6, 2, 2015, 2, 23],
		[1436, 6, 13, 2015, 3, 3],
		[1436, 6, 24, 2015, 3, 14],
		[1436, 7, 6, 2015, 3, 25],
		[1436, 7, 17, 2015, 4, 6],
		[1436, 7, 28, 2015, 4, 17],
		[1436, 8, 9, 2015, 4, 28],
		[1436, 8, 20, 2015, 5, 8],
		[1436, 9, 2, 2015, 5, 19],
		[1436, 9, 13, 2015, 5, 30],
		[1436, 9, 24, 2015, 6, 11],
		[1436, 10, 5, 2015, 6, 22],
		[1436, 10, 16, 2015, 7, 2],
		[1436, 10, 27, 2015, 7, 13],
		[1436, 11, 9, 2015, 7, 24],
		[1436, 11, 20, 2015, 8, 4],
		[1436, 12, 1, 2015, 8, 15],
		[1436, 12, 12, 2015, 8, 26],
		[1436, 12, 23, 2015, 9, 7],
		[1437, 1, 4, 2015, 9, 18],
		[1437, 1, 15, 2015, 9, 29],
		[1437, 1, 26, 2015, 10, 9],
		[1437, 2, 7, 2015, 10, 20],
		[1437, 3, 22, 2016, 0, 3],
		[1437, 4, 3, 2016, 0, 14],
		[1437, 4, 14, 2016, 0, 25],
		[1437, 4, 25, 2016, 1, 5],
		[1437, 5, 7, 2016, 1, 16],
		[1437, 5, 18, 2016, 1, 27],
		[1437, 5, 29, 2016, 2, 9],
		[1437, 6, 10, 2016, 2, 20],
		[1437, 6, 21, 2016, 2, 31],
		[1437, 7, 3, 2016, 3, 11],
		[1437, 7, 14, 2016, 3, 22],
		[1437, 7, 25, 2016, 4, 3],
		[1437, 8, 6, 2016, 4, 14],
		[1437, 8, 17, 2016, 4, 25],
		[1437, 8, 28, 2016, 5, 5],
		[1437, 9, 10, 2016, 5, 16],
		[1437, 9, 21, 2016, 5, 27],
		[1437, 10, 2, 2016, 6, 8],
		[1437, 10, 13, 2016, 6, 19],
		[1437, 10, 24, 2016, 6, 30],
		[1437, 11, 6, 2016, 7, 10],
		[1437, 11, 17, 2016, 7, 21],
		[1437, 11, 28, 2016, 8, 1],
		[1437, 12, 9, 2016, 8, 12],
		[1437, 12, 20, 2016, 8, 23],
		[1438, 1, 2, 2016, 9, 4],
		[1438, 1, 13, 2016, 9, 15],
		[1438, 1, 24, 2016, 9, 26],
		[1438, 2, 5, 2016, 10, 6],
		[1438, 2, 16, 2016, 10, 17],
		[1438, 2, 27, 2016, 10, 28],
		[1438, 4, 12, 2017, 0, 11],
		[1438, 4, 23, 2017, 0, 22],
		[1438, 5, 5, 2017, 1, 2],
		[1438, 5, 16, 2017, 1, 13],
		[1438, 5, 27, 2017, 1, 24],
		[1438, 6, 8, 2017, 2, 7],
		[1438, 6, 19, 2017, 2, 18],
		[1438, 7, 1, 2017, 2, 29],
		[1438, 7, 12, 2017, 3, 9],
		[1438, 7, 23, 2017, 3, 20],
		[1438, 8, 4, 2017, 4, 1],
		[1438, 8, 15, 2017, 4, 12],
		[1438, 8, 26, 2017, 4, 23],
		[1438, 9, 8, 2017, 5, 3],
		[1438, 9, 19, 2017, 5, 14],
		[1438, 9, 30, 2017, 5, 25],
		[1438, 10, 11, 2017, 6, 6],
		[1438, 10, 22, 2017, 6, 17],
		[1438, 11, 4, 2017, 6, 28],
		[1438, 11, 15, 2017, 7, 8],
		[1438, 11, 26, 2017, 7, 19],
		[1438, 12, 7, 2017, 7, 30],
		[1438, 12, 18, 2017, 8, 10],
		[1438, 12, 29, 2017, 8, 21],
		[1439, 1, 11, 2017, 9, 2],
		[1439, 1, 22, 2017, 9, 13],
		[1439, 2, 3, 2017, 9, 24],
		[1439, 2, 14, 2017, 10, 4],
		[1439, 2, 25, 2017, 10, 15],
		[1439, 3, 7, 2017, 10, 26],
		[1439, 3, 18, 2017, 11, 7],
		[1439, 3, 29, 2017, 11, 18],
		[1439, 4, 10, 2017, 11, 29],
		[1439, 4, 21, 2018, 0, 9],
		[1439, 5, 3, 2018, 0, 20],
		[1439, 5, 14, 2018, 0, 31],
		[1439, 5, 25, 2018, 1, 11],
		[1439, 6, 6, 2018, 1, 22],
		[1439, 6, 17, 2018, 2, 5],
		[1439, 6, 28, 2018, 2, 16],
		[1439, 7, 10, 2018, 2, 27],
		[1439, 7, 21, 2018, 3, 7],
		[1439, 8, 2, 2018, 3, 18],
		[1439, 8, 13, 2018, 3, 29],
		[1439, 8, 24, 2018, 4, 10],
		[1439, 9, 6, 2018, 4, 21],
		[1439, 9, 17, 2018, 5, 1],
		[1439, 9, 28, 2018, 5, 12],
		[1439, 10, 9, 2018, 5, 23],
		[1439, 10, 20, 2018, 6, 4],
		[1439, 11, 2, 2018, 6, 15],
		[1439, 11, 13, 2018, 6, 26],
		[1439, 11, 24, 2018, 7, 6],
		[1439, 12, 5, 2018, 7, 17],
		[1439, 12, 16, 2018, 7, 28],
		[1439, 12, 27, 2018, 8, 8],
		[1440, 1, 8, 2018, 8, 19],
		[1440, 1, 19, 2018, 8, 30],
		[1440, 1, 30, 2018, 9, 11],
		[1440, 2, 11, 2018, 9, 22],
		[1440, 2, 22, 2018, 10, 2],
		[1440, 3, 4, 2018, 10, 13],
		[1440, 3, 15, 2018, 10, 24],
		[1440, 3, 26, 2018, 11, 5],
		[1440, 4, 7, 2018, 11, 16],
		[1440, 4, 18, 2018, 11, 27],
		[1440, 4, 29, 2019, 0, 7],
		[1440, 5, 11, 2019, 0, 18],
		[1440, 5, 22, 2019, 0, 29],
		[1440, 6, 3, 2019, 1, 9],
		[1440, 6, 14, 2019, 1, 20],
		[1440, 6, 25, 2019, 2, 3],
		[1440, 7, 7, 2019, 2, 14],
		[1440, 7, 18, 2019, 2, 25],
		[1440, 7, 29, 2019, 3, 5],
		[1440, 8, 10, 2019, 3, 16],
		[1440, 8, 21, 2019, 3, 27],
		[1440, 9, 3, 2019, 4, 8],
		[1440, 9, 14, 2019, 4, 19],
		[1440, 9, 25, 2019, 4, 30],
		[1440, 10, 6, 2019, 5, 10],
		[1440, 10, 17, 2019, 5, 21],
		[1440, 10, 28, 2019, 6, 2],
		[1440, 11, 10, 2019, 6, 13],
		[1440, 11, 21, 2019, 6, 24],
		[1440, 12, 2, 2019, 7, 4],
		[1440, 12, 13, 2019, 7, 15],
		[1440, 12, 24, 2019, 7, 26],
		[1441, 1, 6, 2019, 8, 6],
		[1441, 1, 17, 2019, 8, 17],
		[1441, 1, 28, 2019, 8, 28],
		[1441, 2, 9, 2019, 9, 9],
		[1441, 2, 20, 2019, 9, 20],
		[1441, 3, 2, 2019, 9, 31],
		[1441, 3, 13, 2019, 10, 11],
		[1441, 3, 24, 2019, 10, 22],
		[1441, 5, 9, 2020, 0, 5],
		[1441, 5, 20, 2020, 0, 16],
		[1441, 6, 1, 2020, 0, 27],
		[1441, 6, 12, 2020, 1, 7],
		[1441, 6, 23, 2020, 1, 18],
		[1441, 7, 5, 2020, 1, 29],
		[1441, 7, 16, 2020, 2, 11],
		[1441, 7, 27, 2020, 2, 22],
		[1441, 8, 8, 2020, 3, 2],
		[1441, 8, 19, 2020, 3, 13],
		[1441, 9, 1, 2020, 3, 24],
		[1441, 9, 12, 2020, 4, 5],
		[1441, 9, 23, 2020, 4, 16],
		[1441, 10, 4, 2020, 4, 27],
		[1441, 10, 15, 2020, 5, 7],
		[1441, 10, 26, 2020, 5, 18],
		[1441, 11, 8, 2020, 5, 29],
		[1441, 11, 19, 2020, 6, 10],
		[1441, 11, 30, 2020, 6, 21],
		[1441, 12, 11, 2020, 7, 1],
		[1441, 12, 22, 2020, 7, 12],
		[1442, 1, 4, 2020, 7, 23],
		[1442, 1, 15, 2020, 8, 3],
		[1442, 1, 26, 2020, 8, 14],
		[1442, 2, 7, 2020, 8, 25],
		[1442, 2, 18, 2020, 9, 6],
		[1442, 2, 29, 2020, 9, 17],
		[1442, 3, 11, 2020, 9, 28],
		[1442, 3, 22, 2020, 10, 8],
		[1442, 4, 3, 2020, 10, 19],
		[1442, 4, 14, 2020, 10, 30],
		[1442, 5, 18, 2021, 0, 2],
		[1442, 5, 29, 2021, 0, 13],
		[1442, 6, 10, 2021, 0, 24],
		[1442, 6, 21, 2021, 1, 4],
		[1442, 7, 3, 2021, 1, 15],
		[1442, 7, 14, 2021, 1, 26],
		[1442, 7, 25, 2021, 2, 9],
		[1442, 8, 6, 2021, 2, 20],
		[1442, 8, 17, 2021, 2, 31],
		[1442, 8, 28, 2021, 3, 11],
		[1442, 9, 10, 2021, 3, 22],
		[1442, 9, 21, 2021, 4, 3],
		[1442, 10, 2, 2021, 4, 14],
		[1442, 10, 13, 2021, 4, 25],
		[1442, 10, 24, 2021, 5, 5],
		[1442, 11, 6, 2021, 5, 16],
		[1442, 11, 17, 2021, 5, 27],
		[1442, 11, 28, 2021, 6, 8],
		[1442, 12, 9, 2021, 6, 19],
		[1442, 12, 20, 2021, 6, 30],
		[1443, 1, 1, 2021, 7, 10],
		[1443, 1, 12, 2021, 7, 21],
		[1443, 1, 23, 2021, 8, 1],
		[1443, 2, 4, 2021, 8, 12],
		[1443, 2, 15, 2021, 8, 23],
		[1443, 2, 26, 2021, 9, 4],
		[1443, 3, 8, 2021, 9, 15],
		[1443, 3, 19, 2021, 9, 26],
		[1443, 3, 30, 2021, 10, 6],
		[1443, 4, 11, 2021, 10, 17],
		[1443, 4, 22, 2021, 10, 28],
		[1443, 6, 7, 2022, 0, 11],
		[1443, 6, 18, 2022, 0, 22],
		[1443, 6, 29, 2022, 1, 2],
		[1443, 7, 11, 2022, 1, 13],
		[1443, 7, 22, 2022, 1, 24],
		[1443, 8, 3, 2022, 2, 7],
		[1443, 8, 14, 2022, 2, 18],
		[1443, 8, 25, 2022, 2, 29],
		[1443, 9, 7, 2022, 3, 9],
		[1443, 9, 18, 2022, 3, 20],
		[1443, 9, 29, 2022, 4, 1],
		[1443, 10, 10, 2022, 4, 12],
		[1443, 10, 21, 2022, 4, 23],
		[1443, 11, 3, 2022, 5, 3],
		[1443, 11, 14, 2022, 5, 14],
		[1443, 11, 25, 2022, 5, 25],
		[1443, 12, 6, 2022, 6, 6],
		[1443, 12, 17, 2022, 6, 17],
		[1443, 12, 28, 2022, 6, 28],
		[1444, 1, 10, 2022, 7, 8],
		[1444, 1, 21, 2022, 7, 19],
		[1444, 2, 2, 2022, 7, 30],
		[1444, 2, 13, 2022, 8, 10],
		[1444, 2, 24, 2022, 8, 21],
		[1444, 3, 6, 2022, 9, 2],
		[1444, 3, 17, 2022, 9, 13],
		[1444, 3, 28, 2022, 9, 24],
		[1444, 4, 9, 2022, 10, 4],
		[1444, 4, 20, 2022, 10, 15],
		[1444, 5, 2, 2022, 10, 26],
		[1444, 6, 16, 2023, 0, 9],
		[1444, 6, 27, 2023, 0, 20],
		[1444, 7, 9, 2023, 0, 31],
		[1444, 7, 20, 2023, 1, 11],
		[1444, 8, 1, 2023, 1, 22],
		[1444, 8, 12, 2023, 2, 5],
		[1444, 8, 23, 2023, 2, 16],
		[1444, 9, 5, 2023, 2, 27],
		[1444, 9, 16, 2023, 3, 7],
		[1444, 9, 27, 2023, 3, 18],
		[1444, 10, 8, 2023, 3, 29],
		[1444, 10, 19, 2023, 4, 10],
		[1444, 11, 1, 2023, 4, 21],
		[1444, 11, 12, 2023, 5, 1],
		[1444, 11, 23, 2023, 5, 12],
		[1444, 12, 4, 2023, 5, 23],
		[1444, 12, 15, 2023, 6, 4],
		[1444, 12, 26, 2023, 6, 15],
		[1445, 1, 8, 2023, 6, 26],
		[1445, 1, 19, 2023, 7, 6],
		[1445, 1, 30, 2023, 7, 17],
		[1445, 2, 11, 2023, 7, 28],
		[1445, 2, 22, 2023, 8, 8],
		[1445, 3, 4, 2023, 8, 19],
		[1445, 3, 15, 2023, 8, 30],
		[1445, 3, 26, 2023, 9, 11],
		[1445, 4, 7, 2023, 9, 22],
		[1445, 4, 18, 2023, 10, 2],
		[1445, 4, 29, 2023, 10, 13],
		[1445, 5, 11, 2023, 10, 24],
		[1445, 6, 25, 2024, 0, 7],
		[1445, 7, 7, 2024, 0, 18],
		[1445, 7, 18, 2024, 0, 29],
		[1445, 7, 29, 2024, 1, 9],
		[1445, 8, 10, 2024, 1, 20],
		[1445, 8, 21, 2024, 2, 2],
		[1445, 9, 3, 2024, 2, 13],
		[1445, 9, 14, 2024, 2, 24],
		[1445, 9, 25, 2024, 3, 4],
		[1445, 10, 6, 2024, 3, 15],
		[1445, 10, 17, 2024, 3, 26],
		[1445, 10, 28, 2024, 4, 7],
		[1445, 11, 10, 2024, 4, 18],
		[1445, 11, 21, 2024, 4, 29],
		[1445, 12, 2, 2024, 5, 9],
		[1445, 12, 13, 2024, 5, 20],
		[1445, 12, 24, 2024, 6, 1],
		[1446, 1, 5, 2024, 6, 12],
		[1446, 1, 16, 2024, 6, 23],
		[1446, 1, 27, 2024, 7, 3],
		[1446, 2, 8, 2024, 7, 14],
		[1446, 2, 19, 2024, 7, 25],
		[1446, 3, 1, 2024, 8, 5],
		[1446, 3, 12, 2024, 8, 16],
		[1446, 3, 23, 2024, 8, 27],
		[1446, 4, 4, 2024, 9, 8],
		[1446, 4, 15, 2024, 9, 19],
		[1446, 4, 26, 2024, 9, 30],
		[1446, 5, 8, 2024, 10, 10],
		[1446, 5, 19, 2024, 10, 21],
		[1446, 7, 4, 2025, 0, 4],
		[1446, 7, 15, 2025, 0, 15],
		[1446, 7, 26, 2025, 0, 26],
		[1446, 8, 7, 2025, 1, 6],
		[1446, 8, 18, 2025, 1, 17],
		[1446, 8, 29, 2025, 1, 28],
		[1446, 9, 11, 2025, 2, 11],
		[1446, 9, 22, 2025, 2, 22],
		[1446, 10, 3, 2025, 3, 2],
		[1446, 10, 14, 2025, 3, 13],
		[1446, 10, 25, 2025, 3, 24],
		[1446, 11, 7, 2025, 4, 5],
		[1446, 11, 18, 2025, 4, 16],
		[1446, 11, 29, 2025, 4, 27],
		[1446, 12, 10, 2025, 5, 7],
		[1446, 12, 21, 2025, 5, 18],
		[1447, 1, 3, 2025, 5, 29],
		[1447, 1, 14, 2025, 6, 10],
		[1447, 1, 25, 2025, 6, 21],
		[1447, 2, 6, 2025, 7, 1],
		[1447, 2, 17, 2025, 7, 12],
		[1447, 2, 28, 2025, 7, 23],
		[1447, 3, 10, 2025, 8, 3],
		[1447, 3, 21, 2025, 8, 14],
		[1447, 4, 2, 2025, 8, 25],
		[1447, 4, 13, 2025, 9, 6],
		[1447, 4, 24, 2025, 9, 17],
		[1447, 5, 6, 2025, 9, 28],
		[1447, 5, 17, 2025, 10, 8],
		[1447, 5, 28, 2025, 10, 19],
		[1447, 6, 9, 2025, 10, 30],
		[1447, 7, 13, 2026, 0, 2],
		[1447, 7, 24, 2026, 0, 13],
		[1447, 8, 5, 2026, 0, 24],
		[1447, 8, 16, 2026, 1, 4],
		[1447, 8, 27, 2026, 1, 15],
		[1447, 9, 9, 2026, 1, 26],
		[1447, 9, 20, 2026, 2, 9],
		[1447, 10, 1, 2026, 2, 20],
		[1447, 10, 12, 2026, 2, 31],
		[1447, 10, 23, 2026, 3, 11],
		[1447, 11, 5, 2026, 3, 22],
		[1447, 11, 16, 2026, 4, 3],
		[1447, 11, 27, 2026, 4, 14],
		[1447, 12, 8, 2026, 4, 25],
		[1447, 12, 19, 2026, 5, 5],
		[1447, 12, 30, 2026, 5, 16],
		[1448, 1, 11, 2026, 5, 27],
		[1448, 1, 22, 2026, 6, 8],
		[1448, 2, 3, 2026, 6, 19],
		[1448, 2, 14, 2026, 6, 30],
		[1448, 2, 25, 2026, 7, 10],
		[1448, 3, 7, 2026, 7, 21],
		[1448, 3, 18, 2026, 8, 1],
		[1420, 8, 22, 1999, 11, 1],
		[1424, 10, 6, 2003, 11, 1],
		[1428, 11, 21, 2007, 11, 1],
		[1433, 1, 5, 2011, 11, 1],
	];

	const calendar = new NgbCalendarIslamicCivil();
	describe('toGregorian', () => {
		it('should convert correctly from Hijri to Gregorian', () => {
			DATE_TABLE.forEach((element) => {
				let iDate = new NgbDate(element[0], element[1], element[2]);
				let gDate = new Date(element[3], element[4], element[5]);
				expect(calendar.toGregorian(iDate).getTime()).toEqual(
					gDate.getTime(),
					`Hijri ${iDate.year}-${iDate.month}-${iDate.day} should be Gregorian ${gDate}`,
				);
			});
		});
	});

	describe('fromGregorian', () => {
		it('should convert correctly from Gregorian to Hijri', () => {
			DATE_TABLE.forEach((element) => {
				let iDate = new NgbDate(element[0], element[1], element[2]);
				const gDate = new Date(element[3], element[4], element[5]);
				let iDate2 = calendar.fromGregorian(gDate);
				expect(iDate2.equals(iDate)).toBeTruthy(
					`Gregorian ${gDate} should be Hijri ${iDate.year}-${iDate.month}-${iDate.day}`,
				);
			});
		});
	});

	it('should return number of days per week', () => {
		expect(calendar.getDaysPerWeek()).toBe(7);
	});

	it('should return number of weeks per month', () => {
		expect(calendar.getWeeksPerMonth()).toBe(6);
	});

	it('should return months of a year', () => {
		expect(calendar.getMonths()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	});

	it('should return day of week', () => {
		expect(calendar.getWeekday(new NgbDate(1437, 12, 15))).toEqual(7);
		expect(calendar.getWeekday(new NgbDate(1437, 12, 16))).toEqual(1);
		expect(calendar.getWeekday(new NgbDate(1437, 12, 17))).toEqual(2);
		expect(calendar.getWeekday(new NgbDate(1437, 12, 18))).toEqual(3);
		expect(calendar.getWeekday(new NgbDate(1437, 12, 19))).toEqual(4);
		expect(calendar.getWeekday(new NgbDate(1437, 12, 20))).toEqual(5);
		expect(calendar.getWeekday(new NgbDate(1437, 12, 21))).toEqual(6);
		expect(calendar.getWeekday(new NgbDate(1431, 1, 11))).toEqual(1);
		expect(calendar.getWeekday(new NgbDate(1431, 7, 22))).toEqual(7);
		expect(calendar.getWeekday(new NgbDate(1431, 2, 3))).toEqual(2);
		expect(calendar.getWeekday(new NgbDate(1431, 3, 10))).toEqual(3);
		expect(calendar.getWeekday(new NgbDate(1431, 4, 23))).toEqual(4);
		expect(calendar.getWeekday(new NgbDate(1202, 2, 19))).toEqual(5);
		expect(calendar.getWeekday(new NgbDate(1431, 7, 21))).toEqual(6);
	});
	it('should add days to date', () => {
		expect(calendar.getNext(new NgbDate(1431, 1, 30))).toEqual(new NgbDate(1431, 2, 1));
		expect(calendar.getNext(new NgbDate(1437, 2, 28))).toEqual(new NgbDate(1437, 2, 29));
		expect(calendar.getNext(new NgbDate(1437, 2, 29))).toEqual(new NgbDate(1437, 3, 1));
	});

	it('should subtract days from date', () => {
		expect(calendar.getPrev(new NgbDate(1431, 2, 1))).toEqual(new NgbDate(1431, 1, 30));
		expect(calendar.getPrev(new NgbDate(1431, 3, 1))).toEqual(new NgbDate(1431, 2, 29));
		expect(calendar.getPrev(new NgbDate(1437, 3, 5))).toEqual(new NgbDate(1437, 3, 4));
	});

	it('should add months to date', () => {
		expect(calendar.getNext(new NgbDate(1437, 8, 22), 'm')).toEqual(new NgbDate(1437, 9, 1));
		expect(calendar.getNext(new NgbDate(1437, 8, 1), 'm')).toEqual(new NgbDate(1437, 9, 1));
		expect(calendar.getNext(new NgbDate(1437, 12, 22), 'm')).toEqual(new NgbDate(1438, 1, 1));
	});

	it('should subtract months from date', () => {
		expect(calendar.getPrev(new NgbDate(1437, 8, 22), 'm')).toEqual(new NgbDate(1437, 7, 1));
		expect(calendar.getPrev(new NgbDate(1437, 9, 1), 'm')).toEqual(new NgbDate(1437, 8, 1));
		expect(calendar.getPrev(new NgbDate(1437, 1, 22), 'm')).toEqual(new NgbDate(1436, 12, 1));
	});

	it('should add years to date', () => {
		expect(calendar.getNext(new NgbDate(1437, 2, 22), 'y')).toEqual(new NgbDate(1438, 1, 1));
		expect(calendar.getNext(new NgbDate(1438, 12, 22), 'y')).toEqual(new NgbDate(1439, 1, 1));
	});

	it('should subtract years from date', () => {
		expect(calendar.getPrev(new NgbDate(1437, 12, 22), 'y')).toEqual(new NgbDate(1436, 1, 1));
		expect(calendar.getPrev(new NgbDate(1438, 2, 22), 'y')).toEqual(new NgbDate(1437, 1, 1));
	});

	it('should return week number', () => {
		let week = [
			new NgbDate(1437, 1, 4),
			new NgbDate(1437, 1, 5),
			new NgbDate(1437, 1, 6),
			new NgbDate(1437, 1, 7),
			new NgbDate(1437, 1, 8),
			new NgbDate(1437, 1, 9),
			new NgbDate(1437, 1, 10),
		];
		expect(calendar.getWeekNumber(week, 7)).toEqual(2);
		week = [
			new NgbDate(1437, 12, 15),
			new NgbDate(1437, 12, 16),
			new NgbDate(1437, 12, 17),
			new NgbDate(1437, 12, 18),
			new NgbDate(1437, 12, 19),
			new NgbDate(1437, 12, 20),
			new NgbDate(1437, 12, 21),
		];
		expect(calendar.getWeekNumber(week, 7)).toEqual(50);
		week = [
			new NgbDate(1437, 12, 22),
			new NgbDate(1437, 12, 23),
			new NgbDate(1437, 12, 24),
			new NgbDate(1437, 12, 25),
			new NgbDate(1437, 12, 26),
			new NgbDate(1437, 12, 27),
			new NgbDate(1437, 12, 28),
		];
		expect(calendar.getWeekNumber(week, 7)).toEqual(51);
	});

	describe('setDay', () => {
		it('should return correct value of day', () => {
			expect(calendar.getNext(new NgbDate(1202, 9, 1), 'd', 18).day).toEqual(19);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'd', 0).day).toEqual(1);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'd', 30).day).toEqual(1);
			expect(calendar.getNext(new NgbDate(1437, 1, 1), 'd', 60).day).toEqual(2);
			expect(calendar.getNext(new NgbDate(1431, 2, 1), 'd', -1).day).toEqual(30);
			expect(calendar.getNext(new NgbDate(1431, 2, 1), 'd', -2).day).toEqual(29);
			expect(calendar.getNext(new NgbDate(1431, 2, 1), 'd', -3).day).toEqual(28);
		});
	});

	describe('setMonth', () => {
		it('should return correct value of month', () => {
			expect(calendar.getNext(new NgbDate(1202, 9, 1), 'm', 0).month).toEqual(9);
			expect(calendar.getNext(new NgbDate(1431, 1, 30), 'm', 0).month).toEqual(1);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'd', 30).month).toEqual(2);
			expect(calendar.getNext(new NgbDate(1437, 1, 1), 'd', 60).month).toEqual(3);
			expect(calendar.getNext(new NgbDate(1431, 2, 1), 'd', -2).month).toEqual(1);
			expect(calendar.getNext(new NgbDate(1431, 2, 1), 'd', -31).month).toEqual(12);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'm', -1).month).toEqual(12);
		});
	});

	describe('setYear', () => {
		it('should return correct value of yar', () => {
			expect(calendar.getNext(new NgbDate(1200, 1, 1), 'y', 2).year).toEqual(1202);
			expect(calendar.getNext(new NgbDate(1430, 11, 30), 'y', 1).year).toEqual(1431);
			expect(calendar.getNext(new NgbDate(1431, 12, 1), 'd', 30).year).toEqual(1432);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'm', 12).year).toEqual(1432);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'm', 24).year).toEqual(1433);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'd', -2).year).toEqual(1430);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'm', -1).year).toEqual(1430);
			expect(calendar.getNext(new NgbDate(1431, 1, 1), 'm', -14).year).toEqual(1429);
		});
	});
});
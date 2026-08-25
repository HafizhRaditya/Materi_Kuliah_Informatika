"""Membaca teks dari .ppt LAMA (format biner PowerPoint 97-2003).

tools/baca-pptx.js hanya menangani .pptx (yang sebenarnya zip berisi XML).
Berkas .ppt lama adalah OLE Compound File, jadi butuh pembaca sendiri.

Perlu satu pustaka:
    pip install olefile

Cara pakai:
    python tools/baca-ppt.py "slide.ppt" ["slide-lain.ppt" ...]

Keluarannya kasar: teks placeholder master ("Click to edit Master
title style"), penanda internal seperti ___PPT10, dan nomor slide ikut
terbawa. Saring sendiri, misalnya:

    python tools/baca-ppt.py slide.ppt | grep -v '___PPT' | grep -v '^\\*$'
"""
import os
import struct
import sys

try:
    import olefile
except ImportError:
    sys.exit("Butuh pustaka olefile. Jalankan: pip install olefile")

TEXT_CHARS = 0x0FA0   # TextCharsAtom  — UTF-16LE
TEXT_BYTES = 0x0FA8   # TextBytesAtom  — CP1252
CSTRING = 0x0FBA      # CString        — UTF-16LE


def walk(buf, keluar):
    """Telusuri rekaman PowerPoint; yang berversi 0xF adalah wadah."""
    i, n = 0, len(buf)
    while i + 8 <= n:
        ver_inst, tipe, panjang = struct.unpack_from('<HHI', buf, i)
        i += 8
        if panjang > n - i:
            break
        isi = buf[i:i + panjang]
        if tipe in (TEXT_CHARS, CSTRING):
            keluar.append(isi.decode('utf-16-le', 'replace'))
        elif tipe == TEXT_BYTES:
            keluar.append(isi.decode('cp1252', 'replace'))
        elif (ver_inst & 0x0F) == 0x0F:
            walk(isi, keluar)
        i += panjang


def bersih(s):
    return (s.replace('\r', '\n')
             .replace('\x0b', '\n')
             .replace('\x00', '')
             .replace('’', "'")
             .replace('“', '"')
             .replace('”', '"'))


def baca(berkas):
    f = olefile.OleFileIO(berkas)
    try:
        buf = f.openstream('PowerPoint Document').read()
    finally:
        f.close()
    keluar = []
    walk(buf, keluar)
    return keluar


def main(argv):
    if not argv:
        sys.exit(__doc__)
    for berkas in argv:
        print('=' * 70)
        print(os.path.basename(berkas))
        print('=' * 70)
        for t in baca(berkas):
            t = bersih(t).strip()
            if t:
                print(t)
                print('---')


if __name__ == '__main__':
    main(sys.argv[1:])

PGDMP     6                    z            WormGym    13.4    13.4 -    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    33120    WormGym    DATABASE     n   CREATE DATABASE "WormGym" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE "WormGym";
                postgres    false                        2615    33121    WormGym    SCHEMA        CREATE SCHEMA "WormGym";
    DROP SCHEMA "WormGym";
                postgres    false            �            1259    33130    Inbody_record    TABLE     �  CREATE TABLE "WormGym"."Inbody_record" (
    user_id integer NOT NULL,
    date date NOT NULL,
    weight_kg double precision NOT NULL,
    "SMM_kg" double precision NOT NULL,
    "BFM_kg" double precision NOT NULL,
    "PBF_pct" double precision NOT NULL,
    "LHM_kg" double precision NOT NULL,
    "RHM_kg" double precision NOT NULL,
    "BM_kg" double precision NOT NULL,
    "LLM_kg" double precision NOT NULL,
    "RLM_kg" double precision NOT NULL,
    "LHF_kg" double precision NOT NULL,
    "RHF_kg" double precision NOT NULL,
    "BF_kg" double precision NOT NULL,
    "LLF_kg" double precision NOT NULL,
    "RLF_kg" double precision NOT NULL,
    "BMR_kcal" integer NOT NULL,
    inbody_id integer NOT NULL
);
 &   DROP TABLE "WormGym"."Inbody_record";
       WormGym         heap    postgres    false    4            �            1259    33217    Inbody_record_inbody_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym"."Inbody_record_inbody_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE "WormGym"."Inbody_record_inbody_id_seq";
       WormGym          postgres    false    4    202            �           0    0    Inbody_record_inbody_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE "WormGym"."Inbody_record_inbody_id_seq" OWNED BY "WormGym"."Inbody_record".inbody_id;
          WormGym          postgres    false    208            �            1259    33140    fitness_equip    TABLE     s   CREATE TABLE "WormGym".fitness_equip (
    equip_name character varying NOT NULL,
    equip_id integer NOT NULL
);
 $   DROP TABLE "WormGym".fitness_equip;
       WormGym         heap    postgres    false    4            �            1259    33188    fitness_equip_equip_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".fitness_equip_equip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE "WormGym".fitness_equip_equip_id_seq;
       WormGym          postgres    false    203    4            �           0    0    fitness_equip_equip_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE "WormGym".fitness_equip_equip_id_seq OWNED BY "WormGym".fitness_equip.equip_id;
          WormGym          postgres    false    207            �            1259    33163    fitness_program    TABLE     ,  CREATE TABLE "WormGym".fitness_program (
    user_id integer NOT NULL,
    "Day" integer NOT NULL,
    equip_id integer NOT NULL,
    weight double precision NOT NULL,
    reps integer NOT NULL,
    sets integer NOT NULL,
    finish boolean DEFAULT false NOT NULL,
    program_id integer NOT NULL
);
 &   DROP TABLE "WormGym".fitness_program;
       WormGym         heap    postgres    false    4            �            1259    33230    fitness_program_program_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".fitness_program_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE "WormGym".fitness_program_program_id_seq;
       WormGym          postgres    false    205    4            �           0    0    fitness_program_program_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE "WormGym".fitness_program_program_id_seq OWNED BY "WormGym".fitness_program.program_id;
          WormGym          postgres    false    209            �            1259    33148    fitness_record    TABLE     �   CREATE TABLE "WormGym".fitness_record (
    user_id integer NOT NULL,
    equip_id integer NOT NULL,
    weight double precision NOT NULL,
    reps integer NOT NULL,
    sets integer NOT NULL,
    date date NOT NULL,
    record_id integer NOT NULL
);
 %   DROP TABLE "WormGym".fitness_record;
       WormGym         heap    postgres    false    4            �            1259    33248    fitness_record_record_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".fitness_record_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE "WormGym".fitness_record_record_id_seq;
       WormGym          postgres    false    204    4            �           0    0    fitness_record_record_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE "WormGym".fitness_record_record_id_seq OWNED BY "WormGym".fitness_record.record_id;
          WormGym          postgres    false    210            �            1259    33122 	   user_info    TABLE     �   CREATE TABLE "WormGym".user_info (
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    user_id integer NOT NULL
);
     DROP TABLE "WormGym".user_info;
       WormGym         heap    postgres    false    4            �            1259    33179    user_info_user_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".user_info_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE "WormGym".user_info_user_id_seq;
       WormGym          postgres    false    4    201            �           0    0    user_info_user_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE "WormGym".user_info_user_id_seq OWNED BY "WormGym".user_info.user_id;
          WormGym          postgres    false    206            >           2604    33219    Inbody_record inbody_id    DEFAULT     �   ALTER TABLE ONLY "WormGym"."Inbody_record" ALTER COLUMN inbody_id SET DEFAULT nextval('"WormGym"."Inbody_record_inbody_id_seq"'::regclass);
 K   ALTER TABLE "WormGym"."Inbody_record" ALTER COLUMN inbody_id DROP DEFAULT;
       WormGym          postgres    false    208    202            ?           2604    33190    fitness_equip equip_id    DEFAULT     �   ALTER TABLE ONLY "WormGym".fitness_equip ALTER COLUMN equip_id SET DEFAULT nextval('"WormGym".fitness_equip_equip_id_seq'::regclass);
 H   ALTER TABLE "WormGym".fitness_equip ALTER COLUMN equip_id DROP DEFAULT;
       WormGym          postgres    false    207    203            B           2604    33232    fitness_program program_id    DEFAULT     �   ALTER TABLE ONLY "WormGym".fitness_program ALTER COLUMN program_id SET DEFAULT nextval('"WormGym".fitness_program_program_id_seq'::regclass);
 L   ALTER TABLE "WormGym".fitness_program ALTER COLUMN program_id DROP DEFAULT;
       WormGym          postgres    false    209    205            @           2604    33250    fitness_record record_id    DEFAULT     �   ALTER TABLE ONLY "WormGym".fitness_record ALTER COLUMN record_id SET DEFAULT nextval('"WormGym".fitness_record_record_id_seq'::regclass);
 J   ALTER TABLE "WormGym".fitness_record ALTER COLUMN record_id DROP DEFAULT;
       WormGym          postgres    false    210    204            =           2604    33181    user_info user_id    DEFAULT     |   ALTER TABLE ONLY "WormGym".user_info ALTER COLUMN user_id SET DEFAULT nextval('"WormGym".user_info_user_id_seq'::regclass);
 C   ALTER TABLE "WormGym".user_info ALTER COLUMN user_id DROP DEFAULT;
       WormGym          postgres    false    206    201            �          0    33130    Inbody_record 
   TABLE DATA           �   COPY "WormGym"."Inbody_record" (user_id, date, weight_kg, "SMM_kg", "BFM_kg", "PBF_pct", "LHM_kg", "RHM_kg", "BM_kg", "LLM_kg", "RLM_kg", "LHF_kg", "RHF_kg", "BF_kg", "LLF_kg", "RLF_kg", "BMR_kcal", inbody_id) FROM stdin;
    WormGym          postgres    false    202   i:       �          0    33140    fitness_equip 
   TABLE DATA           @   COPY "WormGym".fitness_equip (equip_name, equip_id) FROM stdin;
    WormGym          postgres    false    203   �;       �          0    33163    fitness_program 
   TABLE DATA           n   COPY "WormGym".fitness_program (user_id, "Day", equip_id, weight, reps, sets, finish, program_id) FROM stdin;
    WormGym          postgres    false    205   �<       �          0    33148    fitness_record 
   TABLE DATA           c   COPY "WormGym".fitness_record (user_id, equip_id, weight, reps, sets, date, record_id) FROM stdin;
    WormGym          postgres    false    204   �=       �          0    33122 	   user_info 
   TABLE DATA           J   COPY "WormGym".user_info (username, password, email, user_id) FROM stdin;
    WormGym          postgres    false    201   [>       �           0    0    Inbody_record_inbody_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('"WormGym"."Inbody_record_inbody_id_seq"', 12, true);
          WormGym          postgres    false    208            �           0    0    fitness_equip_equip_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('"WormGym".fitness_equip_equip_id_seq', 20, true);
          WormGym          postgres    false    207            �           0    0    fitness_program_program_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('"WormGym".fitness_program_program_id_seq', 30, true);
          WormGym          postgres    false    209            �           0    0    fitness_record_record_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('"WormGym".fitness_record_record_id_seq', 30, true);
          WormGym          postgres    false    210            �           0    0    user_info_user_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('"WormGym".user_info_user_id_seq', 3, true);
          WormGym          postgres    false    206            F           2606    33224     Inbody_record Inbody_record_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY "WormGym"."Inbody_record"
    ADD CONSTRAINT "Inbody_record_pkey" PRIMARY KEY (inbody_id);
 Q   ALTER TABLE ONLY "WormGym"."Inbody_record" DROP CONSTRAINT "Inbody_record_pkey";
       WormGym            postgres    false    202            H           2606    33198     fitness_equip fitness_equip_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY "WormGym".fitness_equip
    ADD CONSTRAINT fitness_equip_pkey PRIMARY KEY (equip_id);
 M   ALTER TABLE ONLY "WormGym".fitness_equip DROP CONSTRAINT fitness_equip_pkey;
       WormGym            postgres    false    203            L           2606    33237 $   fitness_program fitness_program_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_pkey PRIMARY KEY (program_id);
 Q   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_pkey;
       WormGym            postgres    false    205            J           2606    33255 "   fitness_record fitness_record_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT fitness_record_pkey PRIMARY KEY (record_id);
 O   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT fitness_record_pkey;
       WormGym            postgres    false    204            D           2606    33216    user_info user_info_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY "WormGym".user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_id);
 E   ALTER TABLE ONLY "WormGym".user_info DROP CONSTRAINT user_info_pkey;
       WormGym            postgres    false    201            M           2606    33225 (   Inbody_record Inbody_record_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym"."Inbody_record"
    ADD CONSTRAINT "Inbody_record_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id) NOT VALID;
 Y   ALTER TABLE ONLY "WormGym"."Inbody_record" DROP CONSTRAINT "Inbody_record_user_id_fkey";
       WormGym          postgres    false    202    2884    201            Q           2606    33243 -   fitness_program fitness_program_equip_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_equip_id_fkey FOREIGN KEY (equip_id) REFERENCES "WormGym".fitness_equip(equip_id) NOT VALID;
 Z   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_equip_id_fkey;
       WormGym          postgres    false    205    203    2888            P           2606    33238 ,   fitness_program fitness_program_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_user_id_fkey FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id) NOT VALID;
 Y   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_user_id_fkey;
       WormGym          postgres    false    2884    205    201            O           2606    33261 +   fitness_record fitness_record_equip_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT fitness_record_equip_id_fkey FOREIGN KEY (equip_id) REFERENCES "WormGym".fitness_equip(equip_id) NOT VALID;
 X   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT fitness_record_equip_id_fkey;
       WormGym          postgres    false    2888    203    204            N           2606    33256 *   fitness_record fitness_record_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT fitness_record_user_id_fkey FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id) NOT VALID;
 W   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT fitness_record_user_id_fkey;
       WormGym          postgres    false    2884    204    201            �   7  x������ г�%<$��^��:2,9s0ɳ呾AŊ��G]�r�y�U,ud�ñ�!���uS�J��UTKM��
	�Ynb�]*�,k�ק{6f�}�����n�M���%����a�g�!:����"*Hlk��W�6�	��-�sR�U;�����n*��ڐv���x��6ؐ���vn���ⶊ�q����쯑�9�m��;������\�%�C6��������a�;�l>����>y:�q�<I�e�;���7�����w˅�GE�����t�ko��;zV��,WK9��9ǜ�      �   �   x�U�KN�@���Sp�I_��"\�EQ�4��*�w�� D4QC�L���ODȋ�����3��z����@���w�<fԼ�:]0������c{@��_�iCg�U�����R�&&����.���?eڿ ��+G��G�c`y�[Bv@�7�/����@HF+����BH��$��+%d,�䥽�Ǯ	�n+�*h����s�r�7�#��m�������,CF	ɔMj���<�V�p:pz ��Ӳ�      �   �   x�]�K� �ur�)������aB�g���|P!!�BZ��$a�g��~��R��B�����į�$I�8���w��?2���� �mD y=�Eץ@�h$�A�j��Hѕj�Z��v��B{bg����d�LH^&0��Iyn�z�Aj�T�H�\pN�Ԃ�����@����cQ%�1+��0�� L�      �   �   x�m�[� �g�Ks�t/��u�3�C	/uⓋ��Q#m$x������G\�N=��TȨ#�$�^o�Q���J�
�8�N��ǔ��,`T��F"��wѐ�A��BV%�l30T����g(v�) ��� ����p��V��HM�v�I�ee��2 �*����d�M�	�ybH�_4���8 ܧ�$k��0�\&r�      �   M   x�+-N-��s�4��$0tH��O�I�K���4�*�	��4��:#duFuA����P Wi��Ҙ+F��� {�!1     
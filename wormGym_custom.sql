PGDMP         
                z            WormGym    14.2    14.2 -               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16394    WormGym    DATABASE     s   CREATE DATABASE "WormGym" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Chinese (Traditional)_Taiwan.950';
    DROP DATABASE "WormGym";
                postgres    false                        2615    16395    WormGym    SCHEMA        CREATE SCHEMA "WormGym";
    DROP SCHEMA "WormGym";
                postgres    false            �            1259    16396    Inbody_record    TABLE     �  CREATE TABLE "WormGym"."Inbody_record" (
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
       WormGym         heap    postgres    false    5            �            1259    16479    Inbody_record_inbody_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym"."Inbody_record_inbody_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE "WormGym"."Inbody_record_inbody_id_seq";
       WormGym          postgres    false    5    210            !           0    0    Inbody_record_inbody_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE "WormGym"."Inbody_record_inbody_id_seq" OWNED BY "WormGym"."Inbody_record".inbody_id;
          WormGym          postgres    false    217            �            1259    16400    fitness_equip    TABLE     s   CREATE TABLE "WormGym".fitness_equip (
    equip_name character varying NOT NULL,
    equip_id integer NOT NULL
);
 $   DROP TABLE "WormGym".fitness_equip;
       WormGym         heap    postgres    false    5            �            1259    16470    fitness_equip_equip_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".fitness_equip_equip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE "WormGym".fitness_equip_equip_id_seq;
       WormGym          postgres    false    211    5            "           0    0    fitness_equip_equip_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE "WormGym".fitness_equip_equip_id_seq OWNED BY "WormGym".fitness_equip.equip_id;
          WormGym          postgres    false    216            �            1259    16406    fitness_program    TABLE       CREATE TABLE "WormGym".fitness_program (
    user_id integer NOT NULL,
    "Day" integer NOT NULL,
    equip_id integer NOT NULL,
    reps integer NOT NULL,
    sets integer NOT NULL,
    finish boolean DEFAULT false NOT NULL,
    program_id integer NOT NULL,
    date date NOT NULL
);
 &   DROP TABLE "WormGym".fitness_program;
       WormGym         heap    postgres    false    5            �            1259    16492    fitness_program_program_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".fitness_program_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE "WormGym".fitness_program_program_id_seq;
       WormGym          postgres    false    5    212            #           0    0    fitness_program_program_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE "WormGym".fitness_program_program_id_seq OWNED BY "WormGym".fitness_program.program_id;
          WormGym          postgres    false    218            �            1259    16411    fitness_record    TABLE     �   CREATE TABLE "WormGym".fitness_record (
    user_id integer NOT NULL,
    equip_id integer NOT NULL,
    weight double precision NOT NULL,
    reps integer NOT NULL,
    sets integer NOT NULL,
    date date NOT NULL,
    record_id integer NOT NULL
);
 %   DROP TABLE "WormGym".fitness_record;
       WormGym         heap    postgres    false    5            �            1259    16509    fitness_record_record_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".fitness_record_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE "WormGym".fitness_record_record_id_seq;
       WormGym          postgres    false    213    5            $           0    0    fitness_record_record_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE "WormGym".fitness_record_record_id_seq OWNED BY "WormGym".fitness_record.record_id;
          WormGym          postgres    false    219            �            1259    16415 	   user_info    TABLE     �   CREATE TABLE "WormGym".user_info (
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    user_id integer NOT NULL
);
     DROP TABLE "WormGym".user_info;
       WormGym         heap    postgres    false    5            �            1259    16461    user_info_user_id_seq    SEQUENCE     �   CREATE SEQUENCE "WormGym".user_info_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE "WormGym".user_info_user_id_seq;
       WormGym          postgres    false    214    5            %           0    0    user_info_user_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE "WormGym".user_info_user_id_seq OWNED BY "WormGym".user_info.user_id;
          WormGym          postgres    false    215            q           2604    16480    Inbody_record inbody_id    DEFAULT     �   ALTER TABLE ONLY "WormGym"."Inbody_record" ALTER COLUMN inbody_id SET DEFAULT nextval('"WormGym"."Inbody_record_inbody_id_seq"'::regclass);
 K   ALTER TABLE "WormGym"."Inbody_record" ALTER COLUMN inbody_id DROP DEFAULT;
       WormGym          postgres    false    217    210            r           2604    16471    fitness_equip equip_id    DEFAULT     �   ALTER TABLE ONLY "WormGym".fitness_equip ALTER COLUMN equip_id SET DEFAULT nextval('"WormGym".fitness_equip_equip_id_seq'::regclass);
 H   ALTER TABLE "WormGym".fitness_equip ALTER COLUMN equip_id DROP DEFAULT;
       WormGym          postgres    false    216    211            t           2604    16493    fitness_program program_id    DEFAULT     �   ALTER TABLE ONLY "WormGym".fitness_program ALTER COLUMN program_id SET DEFAULT nextval('"WormGym".fitness_program_program_id_seq'::regclass);
 L   ALTER TABLE "WormGym".fitness_program ALTER COLUMN program_id DROP DEFAULT;
       WormGym          postgres    false    218    212            u           2604    16510    fitness_record record_id    DEFAULT     �   ALTER TABLE ONLY "WormGym".fitness_record ALTER COLUMN record_id SET DEFAULT nextval('"WormGym".fitness_record_record_id_seq'::regclass);
 J   ALTER TABLE "WormGym".fitness_record ALTER COLUMN record_id DROP DEFAULT;
       WormGym          postgres    false    219    213            v           2604    16462    user_info user_id    DEFAULT     |   ALTER TABLE ONLY "WormGym".user_info ALTER COLUMN user_id SET DEFAULT nextval('"WormGym".user_info_user_id_seq'::regclass);
 C   ALTER TABLE "WormGym".user_info ALTER COLUMN user_id DROP DEFAULT;
       WormGym          postgres    false    215    214                      0    16396    Inbody_record 
   TABLE DATA           �   COPY "WormGym"."Inbody_record" (user_id, date, weight_kg, "SMM_kg", "BFM_kg", "PBF_pct", "LHM_kg", "RHM_kg", "BM_kg", "LLM_kg", "RLM_kg", "LHF_kg", "RHF_kg", "BF_kg", "LLF_kg", "RLF_kg", "BMR_kcal", inbody_id) FROM stdin;
    WormGym          postgres    false    210   ^:                 0    16400    fitness_equip 
   TABLE DATA           @   COPY "WormGym".fitness_equip (equip_name, equip_id) FROM stdin;
    WormGym          postgres    false    211   �;                 0    16406    fitness_program 
   TABLE DATA           l   COPY "WormGym".fitness_program (user_id, "Day", equip_id, reps, sets, finish, program_id, date) FROM stdin;
    WormGym          postgres    false    212   �<                 0    16411    fitness_record 
   TABLE DATA           c   COPY "WormGym".fitness_record (user_id, equip_id, weight, reps, sets, date, record_id) FROM stdin;
    WormGym          postgres    false    213   �=                 0    16415 	   user_info 
   TABLE DATA           J   COPY "WormGym".user_info (username, password, email, user_id) FROM stdin;
    WormGym          postgres    false    214   �?       &           0    0    Inbody_record_inbody_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('"WormGym"."Inbody_record_inbody_id_seq"', 12, true);
          WormGym          postgres    false    217            '           0    0    fitness_equip_equip_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('"WormGym".fitness_equip_equip_id_seq', 20, true);
          WormGym          postgres    false    216            (           0    0    fitness_program_program_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('"WormGym".fitness_program_program_id_seq', 91, true);
          WormGym          postgres    false    218            )           0    0    fitness_record_record_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('"WormGym".fitness_record_record_id_seq', 78, true);
          WormGym          postgres    false    219            *           0    0    user_info_user_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('"WormGym".user_info_user_id_seq', 3, true);
          WormGym          postgres    false    215            x           2606    16485     Inbody_record Inbody_record_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY "WormGym"."Inbody_record"
    ADD CONSTRAINT "Inbody_record_pkey" PRIMARY KEY (inbody_id);
 Q   ALTER TABLE ONLY "WormGym"."Inbody_record" DROP CONSTRAINT "Inbody_record_pkey";
       WormGym            postgres    false    210            z           2606    16478     fitness_equip fitness_equip_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY "WormGym".fitness_equip
    ADD CONSTRAINT fitness_equip_pkey PRIMARY KEY (equip_id);
 M   ALTER TABLE ONLY "WormGym".fitness_equip DROP CONSTRAINT fitness_equip_pkey;
       WormGym            postgres    false    211            |           2606    16498 $   fitness_program fitness_program_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_pkey PRIMARY KEY (program_id);
 Q   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_pkey;
       WormGym            postgres    false    212            ~           2606    16515 "   fitness_record fitness_record_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT fitness_record_pkey PRIMARY KEY (record_id);
 O   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT fitness_record_pkey;
       WormGym            postgres    false    213            �           2606    16469    user_info user_info_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY "WormGym".user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_id);
 E   ALTER TABLE ONLY "WormGym".user_info DROP CONSTRAINT user_info_pkey;
       WormGym            postgres    false    214            �           2606    16486 (   Inbody_record Inbody_record_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym"."Inbody_record"
    ADD CONSTRAINT "Inbody_record_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id) NOT VALID;
 Y   ALTER TABLE ONLY "WormGym"."Inbody_record" DROP CONSTRAINT "Inbody_record_user_id_fkey";
       WormGym          postgres    false    214    3200    210            �           2606    16504 -   fitness_program fitness_program_equip_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_equip_id_fkey FOREIGN KEY (equip_id) REFERENCES "WormGym".fitness_equip(equip_id) NOT VALID;
 Z   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_equip_id_fkey;
       WormGym          postgres    false    212    3194    211            �           2606    16499 ,   fitness_program fitness_program_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_user_id_fkey FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id) NOT VALID;
 Y   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_user_id_fkey;
       WormGym          postgres    false    214    3200    212            �           2606    16521 +   fitness_record fitness_record_equip_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT fitness_record_equip_id_fkey FOREIGN KEY (equip_id) REFERENCES "WormGym".fitness_equip(equip_id) NOT VALID;
 X   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT fitness_record_equip_id_fkey;
       WormGym          postgres    false    211    3194    213            �           2606    16516 *   fitness_record fitness_record_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT fitness_record_user_id_fkey FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id) NOT VALID;
 W   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT fitness_record_user_id_fkey;
       WormGym          postgres    false    214    3200    213               7  x������ г�%<$��^��:2,9s0ɳ呾AŊ��G]�r�y�U,ud�ñ�!���uS�J��UTKM��
	�Ynb�]*�,k�ק{6f�}�����n�M���%����a�g�!:����"*Hlk��W�6�	��-�sR�U;�����n*��ڐv���x��6ؐ���vn���ⶊ�q����쯑�9�m��;������\�%�C6��������a�;�l>����>y:�q�<I�e�;���7�����w˅�GE�����t�ko��;zV��,WK9��9ǜ�         �   x�U�[N�0E�g���{a3���4��*�wEC��De3�t�Ɓ~�e�z��c�����[Pȫ�����y̸y�u ]4ٔ�'���m_{ȳ�g��i�g�M�����2�M��W�] ����!jڮ"�7RG��������x������Ό"Z�s]�rP����t��/Z����m��B���0>�e
�`�#����M�EC�C~)����E���&5�K}�l� � �#��         ?  x�e�A�� �ur������e�=��_C"0�.Z�����EW�8���+s���I������W~$�P�T�d��!���O���$����k(��$��Prb$�WB#��*[���EPF�NI�hr2���S;�W>IH3���F�!$�!����䨂��'ǭx�\�o�H�dHԞ$��`2�jB{b�ӶKX��55�ymj	fn�^k�����{JC"��K�~2��i�ăh��W�G)y߷��C���m-N5�Ob��ϵӶ�[B��!y%�H������u8�R��"����x��,�:[��Z
�kG'�?�}�Y] ]         �  x�u�Qz� ���.�/�s���d�nd����_dD�C�!����������	��^��MZp��Lֻh�7�~�T�� ��.u��X�I��E�AS��zH�Hu�.ԓ����F���~����������6m �����g�N�H�E�D*�Q�R@�����A��'�̊A��ZS��x�=ف�������� ���X�� �4y��ƥ>�&Ƞ�I�L.��|+�\�� �X�	؞?���dA�=4�d����@"�JCS^��>���p�;�i��% ��}� �k� ��o�c����� ^�, ����2�<l��C�s�o��q� -�p���	�'X粛$df�	p�Y�\N86/Ĝ0q�U�ӈIiĤ�����A^=�8 /��T�|�R~ ��.�         M   x�+-N-��s�4��$0tH��O�I�K���4�*�	��4��:#duFuA����P Wi��Ҙ+F��� {�!1     
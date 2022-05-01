PGDMP     6                    z            WormGym    13.4    13.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    inbody_id integer NOT NULL,
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
    "BMR_kcal" integer NOT NULL
);
 &   DROP TABLE "WormGym"."Inbody_record";
       WormGym         heap    postgres    false    4            �            1259    33140    fitness_equip    TABLE     s   CREATE TABLE "WormGym".fitness_equip (
    equip_id integer NOT NULL,
    equip_name character varying NOT NULL
);
 $   DROP TABLE "WormGym".fitness_equip;
       WormGym         heap    postgres    false    4            �            1259    33163    fitness_program    TABLE     ,  CREATE TABLE "WormGym".fitness_program (
    program_id integer NOT NULL,
    user_id integer NOT NULL,
    "Day" integer NOT NULL,
    equip_id integer NOT NULL,
    weight double precision NOT NULL,
    reps integer NOT NULL,
    sets integer NOT NULL,
    finish boolean DEFAULT false NOT NULL
);
 &   DROP TABLE "WormGym".fitness_program;
       WormGym         heap    postgres    false    4            �            1259    33148    fitness_record    TABLE     �   CREATE TABLE "WormGym".fitness_record (
    record_id integer NOT NULL,
    user_id integer NOT NULL,
    equip_id integer NOT NULL,
    weight double precision NOT NULL,
    reps integer NOT NULL,
    sets integer NOT NULL,
    date date NOT NULL
);
 %   DROP TABLE "WormGym".fitness_record;
       WormGym         heap    postgres    false    4            �            1259    33122 	   user_info    TABLE     �   CREATE TABLE "WormGym".user_info (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL
);
     DROP TABLE "WormGym".user_info;
       WormGym         heap    postgres    false    4            �          0    33130    Inbody_record 
   TABLE DATA           �   COPY "WormGym"."Inbody_record" (inbody_id, user_id, date, weight_kg, "SMM_kg", "BFM_kg", "PBF_pct", "LHM_kg", "RHM_kg", "BM_kg", "LLM_kg", "RLM_kg", "LHF_kg", "RHF_kg", "BF_kg", "LLF_kg", "RLF_kg", "BMR_kcal") FROM stdin;
    WormGym          postgres    false    202   u!       �          0    33140    fitness_equip 
   TABLE DATA           @   COPY "WormGym".fitness_equip (equip_id, equip_name) FROM stdin;
    WormGym          postgres    false    203   �"       �          0    33163    fitness_program 
   TABLE DATA           n   COPY "WormGym".fitness_program (program_id, user_id, "Day", equip_id, weight, reps, sets, finish) FROM stdin;
    WormGym          postgres    false    205   �#       �          0    33148    fitness_record 
   TABLE DATA           c   COPY "WormGym".fitness_record (record_id, user_id, equip_id, weight, reps, sets, date) FROM stdin;
    WormGym          postgres    false    204   �$       �          0    33122 	   user_info 
   TABLE DATA           J   COPY "WormGym".user_info (user_id, username, password, email) FROM stdin;
    WormGym          postgres    false    201   j%       7           2606    33134     Inbody_record Inbody_record_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY "WormGym"."Inbody_record"
    ADD CONSTRAINT "Inbody_record_pkey" PRIMARY KEY (inbody_id);
 Q   ALTER TABLE ONLY "WormGym"."Inbody_record" DROP CONSTRAINT "Inbody_record_pkey";
       WormGym            postgres    false    202            9           2606    33147     fitness_equip fitness_equip_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY "WormGym".fitness_equip
    ADD CONSTRAINT fitness_equip_pkey PRIMARY KEY (equip_id);
 M   ALTER TABLE ONLY "WormGym".fitness_equip DROP CONSTRAINT fitness_equip_pkey;
       WormGym            postgres    false    203            =           2606    33168 $   fitness_program fitness_program_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_pkey PRIMARY KEY (program_id);
 Q   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_pkey;
       WormGym            postgres    false    205            ;           2606    33152 "   fitness_record fitness_record_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT fitness_record_pkey PRIMARY KEY (record_id);
 O   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT fitness_record_pkey;
       WormGym            postgres    false    204            5           2606    33129    user_info user_info_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY "WormGym".user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_id);
 E   ALTER TABLE ONLY "WormGym".user_info DROP CONSTRAINT user_info_pkey;
       WormGym            postgres    false    201            @           2606    33158    fitness_record equipid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT equipid_fk FOREIGN KEY (equip_id) REFERENCES "WormGym".fitness_equip(equip_id);
 F   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT equipid_fk;
       WormGym          postgres    false    204    203    2873            B           2606    33174 -   fitness_program fitness_program_equip_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_equip_id_fkey FOREIGN KEY (equip_id) REFERENCES "WormGym".fitness_equip(equip_id);
 Z   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_equip_id_fkey;
       WormGym          postgres    false    2873    203    205            A           2606    33169 ,   fitness_program fitness_program_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_program
    ADD CONSTRAINT fitness_program_user_id_fkey FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id);
 Y   ALTER TABLE ONLY "WormGym".fitness_program DROP CONSTRAINT fitness_program_user_id_fkey;
       WormGym          postgres    false    205    201    2869            >           2606    33135    Inbody_record user_fk    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym"."Inbody_record"
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id);
 D   ALTER TABLE ONLY "WormGym"."Inbody_record" DROP CONSTRAINT user_fk;
       WormGym          postgres    false    2869    202    201            ?           2606    33153    fitness_record userid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY "WormGym".fitness_record
    ADD CONSTRAINT userid_fk FOREIGN KEY (user_id) REFERENCES "WormGym".user_info(user_id);
 E   ALTER TABLE ONLY "WormGym".fitness_record DROP CONSTRAINT userid_fk;
       WormGym          postgres    false    201    204    2869            �   8  x������ г�%<$��^��:2,9s0IlyЏPQ�b�)�Q��\EgbK�D�p,s���<�e��R�f�R����
	�Ynb�]*�,k�ק{6f�}�����n-��/�KV�PC'؞Ն�@>�^�0� ���c_a���������)6�U;�h����n*�U���rms� ��<`C�38.��9�	�m?����3_#�}L�\'w������"7O��!��?�w��z&�{����;X�7�}�x���y��.�bw���ovV�Nr�;R��ۑ����m�G;�/x9�g�����R��1��      �   �   x�U�KN�@���)8b�f�E�L��<Fi%BU(�
BaA�h��r����OEh�~���������[l/cz�۾�c��+��@�N�yB�;?v��<�2Ok>+�҃mZl��;�\F�����)0�{�=9Z����|�����>T
Lr�x���磒l�]ㆴ��*G�3,ة�J���5~�T�l,�M�I�;���Q&[��{xRto��do4 )�YI�ە�a.Fؒ�u�,.�y�)<=D�_A	��      �   �   x�U�]� �g\�L��}n�Ke4NM|�ǟ�؇P�V��,`�4��������x�t����q 8�X�?{�:��c�^���xe���Q���ݧi�L�$���X�[t�0?Q�f1��^q���5VH'����c�����Y
���!3���
�	�d�-o`��-�^���n��J)�aL�      �   �   x�m�Q� D��.��ջ���љ�~�J�&e� 51	)�^܎R+�����U�� �f��m��F8��F��F��7��m$�
I�b��5��x A�7�$3#--��:S����������x�Zz���%��&�z�p떣;��DZ��+�e ���t�����3-��9��;������5xXPۓ�U� F4r�      �   K   x�3�,-N-��s�4��$0tH��O�I�K���2�	��4��:#du�uA����P Wi��2F��� V�!1     